import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        paddingHorizontal: 24,
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1F2937",
        marginBottom: 8,
    },
    subtitle: {
        color: "#6B7280",
        marginBottom: 32,
    },
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 32,
    },
    otpInput: {
        width: 48,
        height: 56,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 12,
        fontSize: 18,
        fontWeight: "bold",
        color: "#111827",

        // shadow iOS
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },

        // shadow Android
        elevation: 2,
    },
    button: {
        backgroundColor: "#2563EB",
        padding: 16,
        borderRadius: 12,

        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    buttonText: {
        color: "#FFFFFF",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 18,
    },
    resendText: {
        textAlign: "center",
        color: "#9CA3AF",
        marginTop: 24,
        fontSize: 14,
    },
    resendLink: {
        color: "#2563EB",
        fontWeight: "600",
    },
});

export default styles;