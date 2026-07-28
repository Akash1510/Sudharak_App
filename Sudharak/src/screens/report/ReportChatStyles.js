
import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
    // 🌿 CONTAINER
    container: {
        flex: 1,
        backgroundColor: "#F5F7FB",
    },

    // 🔷 HEADER (Modern)
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
        fontWeight: "700",
        color: "#FFFFFF",
    },
    headerSubtitle: {
        fontSize: 13,
        color: "#E0E7FF",
        marginTop: 4,
    },

    // 💬 CHAT
    chatContainer: {
        paddingVertical: 10,
    },

    messageRow: {
        paddingHorizontal: 12,
        marginVertical: 6,
    },

    alignRight: {
        alignItems: "flex-end",
    },
    alignLeft: {
        alignItems: "flex-start",
    },

    // 💭 BUBBLE
    bubble: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 18,
        maxWidth: "80%",
    },

    userBubble: {
        backgroundColor: "#4F46E5",
        borderBottomRightRadius: 6,
    },

    botBubble: {
        backgroundColor: "#FFFFFF",
        borderBottomLeftRadius: 6,

        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },

    // ✍️ TEXT
    messageText: {
        fontSize: 15,
        lineHeight: 20,
    },

    userText: {
        color: "#FFFFFF",
    },

    botText: {
        color: "#111827",
    },

    // 🖼 IMAGE IN CHAT
    uploadedImage: {
        width: 180,
        height: 140,
        borderRadius: 12,
        marginBottom: 6,
    },

    // 📷 IMAGE PREVIEW
    previewContainer: {
        position: "absolute",
        bottom: 90,
        left: 20,
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 6,

        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 4,
    },

    previewImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },

    // 🔽 INPUT BAR (Floating Modern)
    inputBar: {
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

    // ⌨️ INPUT FIELD
    input: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingHorizontal: 14,
        paddingVertical: 10,
        color: "#111827",
        fontSize: 14,
        marginBottom: 25,
    },

    // 📎 ICON BUTTON
    iconBtn: {
        marginHorizontal: 6,
        marginBottom: 25,
    },

    icon: {
        fontSize: 20,
        marginBottom: 10
    },

    // 🚀 SEND BUTTON
    sendBtn: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 50,
        marginLeft: 6,
        marginBottom: 25,
    },

    sendText: {
        color: "#4F46E5",
        fontWeight: "600",
    },
});

export default styles;

