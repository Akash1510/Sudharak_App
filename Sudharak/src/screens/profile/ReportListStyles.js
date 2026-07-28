import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
        paddingTop: 50,
        paddingHorizontal: 18,
    },

    header: {
        fontSize: 28,
        fontWeight: "700",
        color: "#111827",
    },

    subHeader: {
        color: "#6B7280",
        marginTop: 4,
        marginBottom: 20,
        fontSize: 14,
    },

    listContent: {
        paddingBottom: 30,
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        backgroundColor: "#FFFFFF",
        padding: 18,
        borderRadius: 18,
        marginBottom: 14,

        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },

    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
    },

    subtitle: {
        fontSize: 12,
        color: "#9CA3AF",
        marginTop: 4,
    },

    badge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },

    badgeText: {
        fontSize: 12,
        fontWeight: "600",
    },

    // STATUS COLORS (modern palette)
    pending: {
        backgroundColor: "#FEF3C7",
    },
    progress: {
        backgroundColor: "#DBEAFE",
    },
    resolved: {
        backgroundColor: "#DCFCE7",
    },
    rejected: {
        backgroundColor: "#FEE2E2",
    },
    default: {
        backgroundColor: "#E5E7EB",
    },
});

export default styles;