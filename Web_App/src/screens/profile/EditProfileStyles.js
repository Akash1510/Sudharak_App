import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        paddingTop: 48,
        paddingHorizontal: 16,
    },

    inner: {
        width: "100%",
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#1F2937",
        marginBottom: 24,
    },

    // Image
    imageContainer: {
        alignItems: "center",
        marginBottom: 24,
    },
    imageWrapper: {
        position: "relative",
    },
    avatar: {
        width: 96,
        height: 96,
        borderRadius: 48,
    },
    editIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#2563EB",
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    editIconText: {
        color: "#FFFFFF",
        fontSize: 12,
    },

    // Card
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,

        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },

    label: {
        fontSize: 12,
        color: "#9CA3AF",
        marginBottom: 4,
    },

    input: {
        fontSize: 16,
        color: "#1F2937",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
        paddingBottom: 8,
        marginBottom: 16,
    },

    inputLast: {
        fontSize: 16,
        color: "#1F2937",
        paddingBottom: 4,
    },

    // Button
    button: {
        backgroundColor: "#2563EB",
        paddingVertical: 16,
        borderRadius: 16,
        marginTop: 24,

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