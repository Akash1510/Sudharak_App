import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    ActivityIndicator,
} from "react-native";
import { useState } from "react";
import {
    addComment,
    editComment,
    deleteComment,
} from "./reportApi";
import styles from "./ReportCommentStyles";

export default function ReportCommentsScreen({ route, navigation }) {
    const { reportId, comments = [] } = route.params;

    const [text, setText] = useState("");
    const [editText, setEditText] = useState("");
    const [commentList, setCommentList] = useState(comments);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    // 🔥 ADD COMMENT
    const handleAdd = async () => {
        if (!text.trim()) return;

        try {
            setLoading(true);
            const res = await addComment(reportId, text);

            // Based on reportApi.js handleResponse, the real data is in res.raw or res.data
            const newComment = res.raw?.comment || res.data?.comment || {
                _id: Date.now().toString(),
                text,
                createdAt: new Date().toISOString(),
                user: { name: "You" }
            };

            setCommentList((prev) => [...prev, newComment]);
            setText("");
        } catch (err) {
            console.log("Error adding comment:", err);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 UPDATE COMMENT
    const handleUpdate = async (commentId) => {
        if (!editText.trim()) return;

        try {
            setLoading(true);
            await editComment(reportId, commentId, editText);

            setCommentList((prev) =>
                prev.map((c) =>
                    c._id === commentId ? { ...c, text: editText } : c
                )
            );

            setEditingId(null);
            setEditText("");
        } catch (err) {
            console.log("Error updating comment:", err);
        } finally {
            setLoading(false);
        }
    };

    // 🔥 DELETE COMMENT
    const handleDelete = async (commentId) => {
        try {
            await deleteComment(reportId, commentId);

            setCommentList((prev) =>
                prev.filter((c) => c._id !== commentId)
            );
        } catch (err) {
            console.log("Error deleting comment:", err);
        }
    };

    const renderComment = ({ item }) => {
        const isEditing = editingId === item._id;
        const time = item.createdAt ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now";
        const userName = item.user?.name || item.userName || "User";
        const initials = userName.charAt(0).toUpperCase();

        return (
            <View style={styles.commentItem}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>{initials}</Text>
                </View>

                <View style={styles.commentBubble}>
                    <View style={styles.commentHeader}>
                        <Text style={styles.userName}>{userName}</Text>
                        <Text style={styles.commentTime}>{time}</Text>
                    </View>

                    {isEditing ? (
                        <View style={styles.editingContainer}>
                            <TextInput
                                value={editText}
                                onChangeText={setEditText}
                                multiline
                                style={styles.editInput}
                            />
                            <View style={styles.editActions}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setEditingId(null);
                                        setEditText("");
                                    }}
                                    style={styles.cancelButton}
                                >
                                    <Text style={styles.cancelButtonText}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleUpdate(item._id)}
                                    style={styles.saveButton}
                                >
                                    <Text style={styles.saveButtonText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <>
                            <Text style={styles.commentText}>{item.text}</Text>

                            <View style={styles.actionsContainer}>
                                <TouchableOpacity
                                    onPress={() => {
                                        // Small delay helps prevent the "accessibility state" error 
                                        // by letting the current touch event finish before re-rendering
                                        setTimeout(() => {
                                            setEditingId(item._id);
                                            setEditText(item.text);
                                        }, 50);
                                    }}
                                    style={styles.actionButton}
                                >
                                    <Text style={styles.editAction}>Edit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => handleDelete(item._id)}
                                    style={styles.actionButton}
                                >
                                    <Text style={styles.deleteAction}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>
            </View>
        );
    };

    const EmptyState = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>💬</Text>
            <Text style={styles.emptyTitle}>No comments yet</Text>
            <Text style={styles.emptySubtitle}>Be the first to share your thoughts on this report!</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* HEADER */}
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 12 }}>
                        <Text style={{ fontSize: 24, color: '#FFFFFF' }}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Report Comments</Text>
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
            >
                <FlatList
                    data={commentList}
                    keyExtractor={(item) => item._id}
                    renderItem={renderComment}
                    contentContainerStyle={styles.listContent}
                    ListEmptyComponent={EmptyState}
                    showsVerticalScrollIndicator={false}
                />

                {/* INPUT AREA */}
                <View style={styles.inputArea}>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            value={editingId ? "" : text}
                            onChangeText={editingId ? () => { } : setText}
                            placeholder={editingId ? "Currently editing..." : "Write a comment..."}
                            placeholderTextColor="#9CA3AF"
                            multiline
                            editable={!editingId}
                            style={styles.input}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleAdd}
                        disabled={!text.trim() || loading || editingId}
                        style={[
                            styles.sendButton,
                            (!text.trim() || loading || editingId) && styles.sendButtonDisabled
                        ]}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={{ color: "#4F46E5", fontSize: 20 }}>➔</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
