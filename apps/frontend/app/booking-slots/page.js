import AppointmentBooking from "../../components/AppointmentBooking";

export const metadata = {
  title: "Book Your Consultation Slot | Zynetra",
  description: "Schedule a free 15-minute consultation with Zynetra. Choose your preferred date and time.",
};

export default function BookingSlotsPage() {
  return (
    <main className="min-h-screen bg-gray-950 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">Schedule Your Consultation</h1>
          <p className="text-gray-400 text-lg">
            Pick a date and time that works best for you. We'll discuss your project and next steps.
          </p>
        </div>
        <AppointmentBooking showServicePicker={true} />
      </div>
    </main>
  );
}
