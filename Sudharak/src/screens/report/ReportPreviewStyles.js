import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },

  header: {
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 16,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1F2937",
  },

  subtitle: {
    color: "#6B7280",
    marginTop: 4,
  },

  card: {
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  image: {
    width: "100%",
    height: 240,
  },

  content: {
    padding: 16,
  },

  issue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },

  description: {
    color: "#4B5563",
    marginBottom: 16,
    lineHeight: 20,
  },

  infoBox: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 12,
  },

  infoItem: {
    marginBottom: 12,
  },

  label: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 2,
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },

  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },

  button: {
    backgroundColor: "#22C55E",
    paddingVertical: 16,
    borderRadius: 16,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    bottom: 30,
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 18,
  },
});

export default styles;