const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

export async function fetchServices() {
  const response = await fetch(`${API_BASE_URL}/api/v1/services`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Failed to load services");
  }

  const payload = await response.json();
  return payload.data || [];
}

export async function createLead(input) {
  const response = await fetch(`${API_BASE_URL}/api/v1/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });

  const payload = await response.json();

  if (!response.ok) {
    const error = new Error(payload.message || "Lead submission failed");
    error.details = payload.errors || {};
    throw error;
  }

  return payload;
}

export async function createAppointment(input) {
  const response = await fetch(`${API_BASE_URL}/api/v1/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });

  const payload = await response.json();

  if (!response.ok) {
    const error = new Error(payload.message || "Appointment scheduling failed");
    error.details = payload.errors || {};
    throw error;
  }

  return payload;
}

export async function getAvailableSlots(date) {
  const response = await fetch(`${API_BASE_URL}/api/v1/appointments/available-slots?date=${date}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Failed to load available slots");
  }

  const payload = await response.json();
  return payload.data || [];
}

export async function registerUser(name, email, password, confirmPassword) {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password, confirmPassword })
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Registration failed");
  }

  return payload;
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Login failed");
  }

  return payload;
}
