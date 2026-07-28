import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#c8d4ecff",
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
        color: "#1a3467ff",
        marginBottom: 8,
        fontSize: 14,
        fontWeight: "500",
    },

    liveContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        backgroundColor: "#c3cff5ff",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        alignSelf: "flex-start",
    },

    liveDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#4F46E5",
        marginRight: 6,
    },

    liveText: {
        color: "#4F46E5",
        fontSize: 13,
        fontWeight: "600",
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
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#D1D5DB",
        borderWidth: 2,
        borderColor: "#FFFFFF",
    },

    circleCompleted: {
        backgroundColor: "#10B981",
    },

    circleActive: {
        backgroundColor: "#4F46E5",
        shadowColor: "#4F46E5",
        shadowOpacity: 0.4,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
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
        color: "#4F46E5",
        marginTop: 4,
        fontWeight: "500",
    },

    completedText: {
        fontSize: 13,
        color: "#22C55E",
        marginTop: 4,
    },

    resolvedThumbnailContainer: {
        marginTop: 12,
        borderRadius: 8,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignSelf: 'flex-start',
    },

    resolvedThumbnail: {
        width: 120,
        height: 120,
        backgroundColor: '#F3F4F6',
    },
    
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    modalContent: {
        width: '90%',
        height: '70%',
        backgroundColor: '#000',
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
    },
    
    fullImage: {
        width: '100%',
        height: '100%',
    },
    
    closeButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        zIndex: 10,
    },
    
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default styles;