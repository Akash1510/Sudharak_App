import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
    tabBar: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,

        // Match the Chat/Comment screen bottom dock
        height: Platform.OS === "ios" ? 95 : 75,
        backgroundColor: "#4F46E5",
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,

        // Uplift from mobile menu
        paddingBottom: Platform.OS === "ios" ? 25 : 5,
        borderTopWidth: 0,



        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 15,
        shadowOffset: { width: 0, height: -5 },
        elevation: 20,

    },

    iconWrapper: {
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        paddingTop: 10,
        marginBottom: 33
    },

    icon: {
        fontSize: 24,
    },

    centerButton: {
        width: 62,
        height: 62,
        borderRadius: 31,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",

        // Floating slightly above the dock
        bottom: Platform.OS === "ios" ? 15 : 10,

        shadowColor: "#000",
        shadowOpacity: 0.3,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 10,
        marginBottom: 25
    },

    plus: {
        color: "#4F46E5",
        fontSize: 34,
        fontWeight: "bold",
    },
});

export default styles;