import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },

    // Header
    header: {
        paddingTop: 55,
        paddingBottom: 24,
        paddingHorizontal: 20,
        backgroundColor: "#4F46E5",
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    subtitle: {
        color: "#E0E7FF",
        marginTop: 4,
        fontSize: 14,
    },

    // Card
    cardWrapper: {
        marginBottom: 20,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        overflow: "hidden",

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    image: {
        width: "100%",
        height: 200,
    },
    cardContent: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#1F2937",
    },

    // Actions
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 16,
    },
    actionBtn: {
        flexDirection: "row",
        alignItems: "center",
    },
    actionIcon: {
        marginRight: 4,
        color: "#4B5563",
    },
    actionText: {
        color: "#4B5563",
    },

    // FAB
    fab: {
        position: "absolute",
        bottom: 24,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#2563EB",
        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    fabText: {
        color: "#FFFFFF",
        fontSize: 28,
    },
});

export default styles;