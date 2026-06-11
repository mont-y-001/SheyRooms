import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import Error from '../components/Error';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function BookingsScreen() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate('/login');
      return;
    }

    let cancelled = false;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        // First, get all bookings for this user
        const { data: bookingData, error: bookingError } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (bookingError) throw bookingError;

        if (cancelled) return;

        // Then, fetch the room for each booking individually
        // This avoids RLS issues with complex joins
        const bookingsWithRooms = await Promise.all(
          (bookingData || []).map(async (booking) => {
            const { data: roomData } = await supabase
              .from('rooms')
              .select('name, imageurls')
              .eq('id', booking.room_id)
              .maybeSingle();

            return { ...booking, rooms: roomData || null };
          })
        );

        if (!cancelled) {
          setBookings(bookingsWithRooms);
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchBookings();

    return () => { cancelled = true; };
  }, [user?.id, navigate, authLoading]);

  const cancelBooking = useCallback(async (bookingId) => {
    if (!user?.id) return;

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)
        .eq('user_id', user.id);

      if (error) throw error;

      setBookings(prev =>
        prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b)
      );
    } catch (err) {
      console.error('Cancel failed:', err);
      alert('Failed to cancel booking: ' + err.message);
    }
  }, [user?.id]);

  return (
    <div className="page-screen">
      <section className="page-hero text-center">
        <div className="container">
          <h1 className="display-5 fw-bold mb-2">
            <i className="fa fa-calendar-check me-2"></i>
            My <span className="accent">Bookings</span>
          </h1>
          <p className="lead">View and manage your upcoming stays</p>
        </div>
      </section>

      <section className="page-content">
        <div className="container">
      {authLoading || loading ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : bookings.length === 0 ? (
        <div className="empty-state glass-card-static">
          <i className="fa fa-calendar"></i>
          <h4 className="text-muted">No bookings yet</h4>
          <p className="text-muted" style={{ maxWidth: 400, margin: '0 auto' }}>
            Start exploring our rooms and book your first stay!
          </p>
          <button className="btn btn-dark mt-3 px-4" onClick={() => navigate('/home')}>
            <i className="fa fa-search me-2"></i> Browse Rooms
          </button>
        </div>
      ) : (
        <div className="row">
          {bookings.map((booking) => {
            const isActive = booking.status === 'confirmed' || booking.status === 'booked';
            const imgUrl = booking.rooms?.imageurls?.[0] || "https://via.placeholder.com/300x200?text=Room";

            return (
              <div className="col-lg-6 mb-4" key={booking.id}>
                <div className="glass-card h-100" style={{ marginTop: 0 }}>
                  <div className="row g-0 h-100">
                    <div className="col-md-5">
                      <LazyLoadImage
                        src={imgUrl}
                        className="img-fluid rounded-start"
                        alt={booking.rooms?.name || 'Room'}
                        style={{ objectFit: 'cover', width: '100%', height: 220 }}
                        effect="blur"
                      />
                    </div>
                    <div className="col-md-7">
                      <div className="card-body d-flex flex-column h-100">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h5 className="card-title mb-0">
                            {booking.rooms?.name || 'Room'}
                          </h5>
                          <span className={`badge ${isActive ? 'bg-success' : booking.status === 'cancelled' ? 'bg-danger' : 'bg-warning'}`}>
                            {booking.status?.toUpperCase() || 'BOOKED'}
                          </span>
                        </div>

                        <div className="mt-2">
                          <p className="card-text small mb-1">
                            <i className="fa fa-calendar me-2 text-muted"></i>
                            <strong>{booking.fromdate}</strong> → <strong>{booking.todate}</strong>
                          </p>
                          <p className="card-text small mb-1">
                            <i className="fa fa-clock-o me-2 text-muted"></i>
                            {booking.totaldays} Day{booking.totaldays > 1 ? 's' : ''}
                          </p>
                          <p className="card-text small mb-1">
                            <i className="fa fa-id-card me-2 text-muted"></i>
                            Booking ID: {booking.id?.substring(0, 8)}...
                          </p>
                        </div>

                        <hr className="my-2" />

                        <div className="d-flex justify-content-between align-items-center mt-auto">
                          <span className="h5 mb-0 text-success fw-bold">₹{booking.totalamount}</span>
                          {isActive && (
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => cancelBooking(booking.id)}
                            >
                              <i className="fa fa-times me-1"></i> Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
        </div>
      </section>
    </div>
  );
}

export default BookingsScreen;