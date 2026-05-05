const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  || (process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://zynetro-application-3.onrender.com");

async function readPayload(response) {
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return null;
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function requestJson(path, options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, options);
  } catch (error) {
    const networkError = new Error(
      "Unable to reach the API. Check backend URL, CORS origin settings, and network availability."
    );
    networkError.cause = error;
    throw networkError;
  }

  const payload = await readPayload(response);

  if (!response.ok) {
    const error = new Error(payload?.message || `Request failed with status ${response.status}`);
    error.details = payload?.errors || {};
    error.status = response.status;
    throw error;
  }

  return payload;
}

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
  return requestJson("/api/v1/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });
}

export async function createAppointment(input) {
  return requestJson("/api/v1/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });
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
  return requestJson("/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, password, confirmPassword })
  });
}

export async function loginUser(email, password) {
  return requestJson("/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
}
