import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  innerContainer: {
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
  },

  // Cards
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardDefault: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
  },
  cardSelected: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  cardText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  cardTextDefault: {
    color: "#1F2937",
  },
  cardTextSelected: {
    color: "#FFFFFF",
  },

  // Button
  button: {
    backgroundColor: "#22C55E",
    padding: 16,
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