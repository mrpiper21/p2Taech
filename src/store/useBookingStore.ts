// store/useBookingStore.ts
import { create } from 'zustand';
import { baseUrl } from '../apis';
import axios from 'axios';

interface BookingAttributes {
    id?: string;
    location: string;
    date: string;
    time: string;
    tutorid: string;
    studentid: string;
    created_at?: Date;
    updated_at?: Date;
}

interface BookingState {
  bookings: BookingAttributes[];
  loading: boolean;
  error: string | null;
  selectedBooking: BookingAttributes | null;
  fetchBookings: (userId: number, role: 'tutor' | 'student') => Promise<void>;
  createBooking: (booking: Omit<BookingAttributes, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateBooking: (id: string, updates: Partial<BookingAttributes>) => Promise<void>;
  deleteBooking: (id: string) => Promise<void>;
  selectBooking: (booking: BookingAttributes | null) => void;
  reset: () => void;
}

interface BookingResponse {
  data: {
    tutorBookings: BookingAttributes[];
    studentBookings: BookingAttributes[];
  };
}

export const useBookingStore = create<BookingState>((set) => ({
  bookings: [],
  loading: false,
  error: null,
  selectedBooking: null,

  fetchBookings: async (userId, role) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${baseUrl}/bookings/user/${userId}`);
      const data: BookingResponse = await response.data;
      
      set({
        bookings: role === 'tutor' ? data.data.tutorBookings : data.data.studentBookings,
        loading: false
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch bookings',
        loading: false 
      });
    }
  },

  createBooking: async (booking) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      });
      
      if (!response.ok) throw new Error('Failed to create booking');
      
      const newBooking = await response.json();
      set((state) => ({ 
        bookings: [...state.bookings, newBooking],
        loading: false 
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to create booking',
        loading: false 
      });
    }
  },

  updateBooking: async (id, updates) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      
      if (!response.ok) throw new Error('Failed to update booking');
      
      const updatedBooking = await response.json();
      set((state) => ({
        bookings: state.bookings.map(booking => 
          booking.id === id ? { ...booking, ...updatedBooking } : booking
        ),
        loading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update booking',
        loading: false 
      });
    }
  },

  deleteBooking: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete booking');
      
      set((state) => ({
        bookings: state.bookings.filter(booking => booking.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete booking',
        loading: false 
      });
    }
  },

  selectBooking: (booking) => {
    set({ selectedBooking: booking });
  },

  reset: () => {
    set({
      bookings: [],
      loading: false,
      error: null,
      selectedBooking: null
    });
  }
}));