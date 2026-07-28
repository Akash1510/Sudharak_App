import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    header: {
        paddingTop: 55,
        paddingBottom: 16,
        paddingHorizontal: 18,
        backgroundColor: "#4F46E5",
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    listContent: {
        padding: 16,
        paddingBottom: 145, // Space for input
    },
    commentItem: {
        flexDirection: "row",
        marginBottom: 20,
    },
    avatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: "#E5E7EB",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    avatarText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#6B7280",
    },
    commentBubble: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 12,
        borderRadius: 16,
        borderTopLeftRadius: 2,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    commentHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
    },
    userName: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#1F2937",
    },
    commentTime: {
        fontSize: 12,
        color: "#9CA3AF",
    },
    commentText: {
        fontSize: 15,
        color: "#374151",
        lineHeight: 20,
    },
    actionsContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 8,
        borderTopWidth: 1,
        borderTopColor: "#F3F4F6",
        paddingTop: 8,
    },
    actionButton: {
        marginLeft: 16,
        flexDirection: "row",
        alignItems: "center",
    },
    editAction: {
        fontSize: 12,
        color: "#2563EB",
        fontWeight: "600",
    },
    deleteAction: {
        fontSize: 12,
        color: "#EF4444",
        fontWeight: "600",
    },
    inputArea: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#4F46E5",
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: Platform.OS === "ios" ? 34 : 20,
        flexDirection: "row",
        alignItems: "center",
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: -4 },
        elevation: 10,

    },
    inputWrapper: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        paddingHorizontal: 16,
        marginRight: 12,
        height: 48,
        marginBottom: 25
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: "#1F2937",
        paddingVertical: 10,
        maxHeight: 100,

    },
    sendButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#FFFFFF",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 25
    },
    sendButtonDisabled: {
        backgroundColor: "#93C5FD",
    },
    editingContainer: {
        marginBottom: 4,
    },
    editInput: {
        backgroundColor: "#F9FAFB",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 8,
        padding: 8,
        fontSize: 14,
        color: "#1F2937",
        minHeight: 60,
        textAlignVertical: "top",
    },
    editActions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 8,
    },
    saveButton: {
        backgroundColor: "#2563EB",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        marginLeft: 8,
    },
    saveButtonText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "600",
    },
    cancelButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    cancelButtonText: {
        color: "#6B7280",
        fontSize: 12,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 100,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: 16,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#374151",
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 14,
        color: "#9CA3AF",
        textAlign: "center",
        paddingHorizontal: 40,
    },
});

export default styles;
