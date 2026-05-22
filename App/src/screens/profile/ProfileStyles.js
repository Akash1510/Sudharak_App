import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },

    // 🔷 HEADER (Modern)
    header: {
        paddingTop: 55,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: "#4F46E5",
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
    },

    profileCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 20,
        marginHorizontal: 16,
        marginBottom: 24,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
    },
    profileRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 12,
    },
    profileInfo: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1F2937",
    },
    info: {
        color: "#6B7280",
    },
    editIcon: {
        fontSize: 20,
    },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    statCard: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 14,
        borderRadius: 16,
        marginHorizontal: 4,
        elevation: 2,
    },
    statLabel: {
        fontSize: 12,
        color: "#9CA3AF",
    },
    statValue: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1F2937",
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
        marginHorizontal: 16,
        color: "#1F2937",
    },

    reportItemWrapper: {
        marginBottom: 12,
        marginHorizontal: 16,
    },
    reportCard: {
        backgroundColor: "#FFFFFF",
        padding: 14,
        borderRadius: 14,
        elevation: 2,
    },
    reportTitle: {
        fontWeight: "600",
        color: "#1F2937",
    },

    statusBadge: {
        marginTop: 8,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        alignSelf: "flex-start",
    },
    statusText: {
        fontSize: 12,
        fontWeight: "600",
    },

    statusPending: { backgroundColor: "#FEF3C7" },
    statusProgress: { backgroundColor: "#DBEAFE" },
    statusResolved: { backgroundColor: "#DCFCE7" },
    statusDefault: { backgroundColor: "#E5E7EB" },

    statusTextPending: { color: "#D97706" },
    statusTextProgress: { color: "#2563EB" },
    statusTextResolved: { color: "#16A34A" },
    statusTextDefault: { color: "#6B7280" },

    listContent: {
        paddingBottom: 20,
    },
});

export default styles;