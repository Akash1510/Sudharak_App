import jwt,os

from functools import wraps
from flask import request,jsonify,g

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM="HS256"

def verify_token(required_role=None):

    def decorator(f):
        @wraps(f)

        def Wrapper(*args,**kwargs):

            auth_header=request.headers.get("Authorization")

            if not auth_header:
                return jsonify({
                    "STATUS":"FAILED",
                    "MESSAGE":"Authorization header Missing"
                }),401
            
            try:
                token = auth_header.split(" ")[1] #bearer <token>

                decoded = jwt.decode(
                    token,
                    JWT_SECRET,
                    algorithms=[JWT_ALGORITHM]
                )

                # Role Check 
                if required_role and decoded.get("role") != required_role:
                    return jsonify({
                        "STATUS":"FAILED",
                        "MESSAGE":"Access Denied"
                    }),403
                
                # attach user to global request context

                g.user = decoded
            except jwt.ExpiredSignatureError:
                return jsonify({
                    "STATUS":"FAILED",
                    "MESSAGE":"Token expired"
                }),401
            
            except jwt.InvalidTokenError:
                return jsonify({
                    "STATUS":"FAILED",
                    "MESSAGE":"Invalid token"
                }),401
            
            except Exception as e:
                return jsonify({
                    "STATUS":"FAILED",
                    "MESSAGE":"Authentication error"
                }),401
            
            return f(*args,**kwargs)
        
        return Wrapper
    return decorator


