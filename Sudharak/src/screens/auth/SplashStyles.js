import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logoContainer: {
        alignItems: "center",
        marginBottom: 24,
    },
    logo: {
        width: 140,
        height: 140,
    },
    title: {
        color: "#FFFFFF",
        fontSize: 36,
        fontWeight: "900",
        letterSpacing: 2,
        textAlign: "center",
    },
    subtitle: {
        color: "rgba(255,255,255,0.85)",
        marginTop: 6,
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    },
    bottomContent: {
        position: "absolute",
        bottom: 60,
        alignItems: "center",
    },
    loadingText: {
        color: "rgba(255,255,255,0.6)",
        fontSize: 12,
        marginTop: 12,
        letterSpacing: 1,
        textTransform: "uppercase",
    },
});

export default styles;