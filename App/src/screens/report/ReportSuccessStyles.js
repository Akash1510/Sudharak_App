import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },

    iconContainer: {
        width: 112,
        height: 112,
        borderRadius: 56,
        backgroundColor: "#DCFCE7",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 24,
    },

    icon: {
        fontSize: 48,
        color: "#16A34A",
        fontWeight: "bold",
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1F2937",
        textAlign: "center",
        marginBottom: 8,
    },

    subtitle: {
        color: "#6B7280",
        textAlign: "center",
        marginBottom: 32,
        lineHeight: 20,
    },

    button: {
        backgroundColor: "#2563EB",
        paddingVertical: 16,
        borderRadius: 16,
        width: "100%",

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
});

export default styles;