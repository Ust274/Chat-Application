import { create } from 'zustand';
import { axiosCon } from '../utils/axios.js';
import { toast } from 'react-hot-toast';
import { useAuthStore } from './useAuthStore.js';

export const useMessageStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessageLoading: false,
   
    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosCon.get('/messages/users');
            set({ users: res.data, isUserLoading: false });
        } catch (error) {
            toast.error('Failed to get users');
            console.error('Error fetching users:', error);
            set({ isUserLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessageLoading: true });
        try {
            const res = await axiosCon.get(`/messages/${userId}`);
            set({ messages: res.data, isMessageLoading: false });
        } catch (error) {
            toast.error('Failed to get messages');
            console.error('Error fetching messages:', error);
            set({ isMessageLoading: false });
        }
    },

    setSelectedUser: (user) => {
        set({ selectedUser: user });
    },

    sendMessage: async (message) => {
        const { selectedUser, messages } = get();
        if (!selectedUser) {
            toast.error('No user selected');
            return;
        }

        try {
            const res = await axiosCon.post(`/messages/send/${selectedUser._id}`, message);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            toast.error('Failed to send message');
            console.error('Error sending message:', error);
        }
    },

    connectToMessages: () => {
        const {selectedUser} = get();
        
        const socket = useAuthStore.getState().socket;
        if (!socket) return;

        socket.on('newMessage', (newMessage) => {
            if(newMessage.senderId !== selectedUser._id) return;
            set({ 
                messages: [...get().messages, newMessage],
            });
        });
    },
    disconnectFromMessages: () => 
    {
        const socket = useAuthStore.getState().socket;
        if (!socket) return;
        socket.off('newMessage');
    },

}));