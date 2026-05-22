import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F3F4F6",
    },

    image: {
        width: "100%",
        height: 260,
    },

    overlay: {
        position: "absolute",
        bottom: 20,
        left: 16,
        right: 16,
    },

    overlayTitle: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "700",
        textShadowColor: "rgba(0,0,0,0.4)",
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
    },

    content: {
        paddingHorizontal: 16,
        marginTop: -24,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 18,
        padding: 16,
        marginBottom: 16,

        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 4,
    },

    infoText: {
        color: "#6B7280",
        marginBottom: 6,
        fontSize: 13,
    },

    liveText: {
        color: "#2563EB",
        marginTop: 6,
        fontSize: 13,
        fontWeight: "500",
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 12,
    },

    stepRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 24,
    },

    timeline: {
        alignItems: "center",
        marginRight: 12,
    },

    circle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: "#D1D5DB",
    },

    circleCompleted: {
        backgroundColor: "#22C55E",
    },

    circleActive: {
        backgroundColor: "#2563EB",
    },

    line: {
        width: 2,
        height: 40,
        backgroundColor: "#E5E7EB",
        marginTop: 4,
    },

    stepContent: {
        flex: 1,
    },

    stepTitle: {
        fontSize: 15,
        fontWeight: "600",
        color: "#9CA3AF",
    },

    stepActiveText: {
        color: "#111827",
    },

    activeText: {
        fontSize: 13,
        color: "#2563EB",
        marginTop: 4,
    },

    completedText: {
        fontSize: 13,
        color: "#22C55E",
        marginTop: 4,
    },
});

export default styles;