import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { supabase } from "../supabaseClient";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import { Modal, Input, Row, Col } from 'antd';

const BookingScreen = () => {
  const { roomid, fromdate, todate } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [room, setRoom] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDays, setTotalDays] = useState(0);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isPaymentModalVisible, setIsPaymentModalVisible] = useState(false);
  
  // Payment States
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const user = React.useMemo(() => JSON.parse(localStorage.getItem("currentUser")), []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchRoom = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from('rooms')
          .select('*')
          .eq('id', roomid)
          .maybeSingle();

        if (error) throw error;
        if (!data) throw new Error("Room not found");

        setRoom(data);

        const days =
          moment(todate, 'DD-MM-YYYY').diff(
            moment(fromdate, 'DD-MM-YYYY'),
            'days'
          ) + 1;

        setTotalDays(days);
        setTotalAmount(days * data.rentperday);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomid, fromdate, todate, navigate]);

  const showPaymentModal = () => {
    setIsPaymentModalVisible(true);
  };

  const handlePaymentCancel = () => {
    setIsPaymentModalVisible(false);
  };

  async function bookRoom() {
    const bookingDetails = {
      room_id: roomid,
      user_id: user.id,
      fromdate,
      todate,
      totalamount: totalAmount,
      totaldays: totalDays,
    };

    try {
      setBookingLoading(true);
      setIsPaymentModalVisible(false);
      
      const { error } = await supabase
        .from('bookings')
        .insert([bookingDetails]);

      if (error) throw error;

      setBookingSuccess(true);
      
      Modal.success({
        title: 'Booking Confirmed!',
        content: (
          <div>
            <p>Your room at <strong>{room.name}</strong> has been booked successfully.</p>
            <p>Dates: <strong>{fromdate}</strong> to <strong>{todate}</strong></p>
            <p>We've sent a confirmation email to your registered address.</p>
          </div>
        ),
        onOk() {
          navigate('/home');
        },
        okText: 'Back to Home',
        centered: true,
      });

    } catch (err) {
      console.error(err);
      setError("Booking failed. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  }

  return (
    <div className="container py-5">
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message={error} />
      ) : room && (
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="bs p-5">
              <div className="row">
                <div className="col-md-7 border-end pe-md-5">
                  <h2 className="mb-4">{room.name}</h2>
                  <img
                    className="img-fluid rounded shadow-lg mb-4"
                    alt={room.name}
                    src={room.imageurls?.[0] || "https://via.placeholder.com/600"}
                    style={{ height: "400px", width: "100%", objectFit: "cover" }}
                  />
                  <p className="text-muted lead">{room.description}</p>
                </div>

                <div className="col-md-5 ps-md-5 d-flex flex-column">
                  <div className="mb-5">
                    <h4 className="text-dark border-bottom pb-3 mb-4">Booking Details</h4>
                    <div className="details-list">
                      <p className="d-flex justify-content-between"><strong>Guest:</strong> <span>{user?.name}</span></p>
                      <p className="d-flex justify-content-between"><strong>From Date:</strong> <span>{fromdate}</span></p>
                      <p className="d-flex justify-content-between"><strong>To Date:</strong> <span>{todate}</span></p>
                      <p className="d-flex justify-content-between"><strong>Capacity:</strong> <span>{room.maxcount} Persons</span></p>
                    </div>
                  </div>

                  <div className="mb-5 bg-light p-4 rounded-3">
                    <h4 className="text-dark border-bottom pb-3 mb-4">Summary</h4>
                    <p className="d-flex justify-content-between"><span>Total Stay:</span> <span>{totalDays} Days</span></p>
                    <p className="d-flex justify-content-between"><span>Rent per Night:</span> <span>₹{room.rentperday}</span></p>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="h5 mb-0">Total Amount:</span>
                      <span className="h3 mb-0 text-success fw-bold">₹{totalAmount}</span>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <button 
                      className="btn btn-dark btn-lg w-100 py-3 fw-bold shadow-sm" 
                      onClick={showPaymentModal}
                      disabled={bookingLoading || bookingSuccess}
                    >
                      {bookingLoading ? "Processing..." : `Pay & Confirm Booking`}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      <Modal
        title={<h4 className="m-0"><i className="fa fa-credit-card me-2"></i> Secure Payment</h4>}
        open={isPaymentModalVisible}
        onOk={bookRoom}
        onCancel={handlePaymentCancel}
        okText={`Pay ₹${totalAmount}`}
        cancelText="Cancel"
        okButtonProps={{ 
          className: "btn-dark", 
          disabled: !cardName || !cardNumber || !expiry || !cvv,
          size: "large"
        }}
        cancelButtonProps={{ size: "large" }}
        width={500}
        centered
      >
        <div className="py-3">
          <div className="mb-4 p-3 bg-light rounded-3 text-center">
            <p className="text-muted mb-1">Paying to SHEYROOMS</p>
            <h3 className="fw-bold">₹{totalAmount}</h3>
          </div>
          
          <div className="mb-3">
            <label className="form-label small fw-bold">CARDHOLDER NAME</label>
            <Input 
              placeholder="e.g. John Doe" 
              size="large" 
              value={cardName} 
              onChange={(e) => setCardName(e.target.value)} 
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label small fw-bold">CARD NUMBER</label>
            <Input 
              placeholder="0000 0000 0000 0000" 
              size="large" 
              value={cardNumber} 
              onChange={(e) => setCardNumber(e.target.value)} 
            />
          </div>
          
          <Row gutter={16}>
            <Col span={14}>
              <div className="mb-3">
                <label className="form-label small fw-bold">EXPIRY DATE</label>
                <Input 
                  placeholder="MM / YY" 
                  size="large" 
                  value={expiry} 
                  onChange={(e) => setExpiry(e.target.value)} 
                />
              </div>
            </Col>
            <Col span={10}>
              <div className="mb-3">
                <label className="form-label small fw-bold">CVV</label>
                <Input 
                  type="password" 
                  placeholder="***" 
                  size="large" 
                  value={cvv} 
                  onChange={(e) => setCvv(e.target.value)} 
                />
              </div>
            </Col>
          </Row>
          
          <div className="mt-2 text-center">
            <img src="https://help.zazzle.com/hc/article_attachments/360010513393/Logos-01.png" alt="cards" style={{ height: "30px", opacity: 0.7 }} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BookingScreen;