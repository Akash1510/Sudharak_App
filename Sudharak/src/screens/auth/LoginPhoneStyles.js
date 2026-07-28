import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  animatedContainer: {
    width: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 40,
  },
  inputContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  label: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  input: {
    color: "#111827",
    fontSize: 16,
    paddingVertical: 4,
  },
  button: {
    backgroundColor: "#4F46E5",
    padding: 18,
    borderRadius: 16,
    marginTop: 12,
    shadowColor: "#4F46E5",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  footerText: {
    textAlign: "center",
    color: "#9CA3AF",
    marginTop: 32,
    fontSize: 13,
    lineHeight: 20,
    paddingHorizontal: 20,
  },
});

export default styles;