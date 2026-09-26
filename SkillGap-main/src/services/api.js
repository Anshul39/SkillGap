const API_BASE = '/api'

function getToken() {
  return localStorage.getItem('skillgap_token') || localStorage.getItem('token') || ''
}

export function setAuthSession(token, user) {
  if (token) {
    localStorage.setItem('skillgap_token', token)
    localStorage.setItem('token', token)
  }
  if (user) {
    localStorage.setItem('skillgap_user', JSON.stringify(user))
  }
}

export function clearAuthSession() {
  localStorage.removeItem('skillgap_token')
  localStorage.removeItem('token')
  localStorage.removeItem('skillgap_user')
}

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem('skillgap_user') || '{}')
  } catch {
    return {}
  }
}

async function request(endpoint, options = {}) {
  const token = getToken()
  const headers = {
    ...(options.headers || {}),
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  // Set json content-type only if body is not FormData
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
    options.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body)
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })

  let data = null
  try {
    data = await response.json()
  } catch (err) {
    data = { success: false, message: response.statusText || 'Invalid response from server' }
  }

  if (!response.ok) {
    const errorMsg = data?.message || `Request failed with status ${response.status}`
    const error = new Error(errorMsg)
    error.status = response.status
    error.data = data
    throw error
  }

  return data
}

export const api = {
  auth: {
    async register(userData) {
      const data = await request('/auth/register', {
        method: 'POST',
        body: userData,
      })
      if (data.token && data.user) {
        setAuthSession(data.token, data.user)
      }
      return data
    },

    async login(credentials) {
      const data = await request('/auth/login', {
        method: 'POST',
        body: credentials,
      })
      if (data.token && data.user) {
        setAuthSession(data.token, data.user)
      }
      return data
    },

    async me() {
      const data = await request('/auth/me')
      if (data.user) {
        localStorage.setItem('skillgap_user', JSON.stringify(data.user))
      }
      return data
    },

    async updateProfile(profileData) {
      const data = await request('/profile', {
        method: 'PUT',
        body: profileData,
      })
      if (data.user) {
        localStorage.setItem('skillgap_user', JSON.stringify(data.user))
      }
      return data
    },

    logout() {
      clearAuthSession()
    },
  },

  targets: {
    async getAll() {
      return request('/targets')
    },

    async getById(id) {
      return request(`/targets/${id}`)
    },

    async selectTarget(targetId) {
      return request('/user-target', {
        method: 'POST',
        body: { targetId },
      })
    },

    async getSelected() {
      return request('/user-target')
    },
  },

  skills: {
    async getSkills() {
      return request('/skills')
    },

    async saveSkills(skills) {
      return request('/skills', {
        method: 'POST',
        body: { skills },
      })
    },
  },

  resume: {
    async upload(file) {
      const formData = new FormData()
      formData.append('resume', file)
      formData.append('file', file)
      return request('/resume', {
        method: 'POST',
        body: formData,
      })
    },

    async get() {
      return request('/resume')
    },

    async delete() {
      return request('/resume', {
        method: 'DELETE',
      })
    },
  },

  applications: {
    async getAll() {
      return request('/applications')
    },

    async create(appData) {
      return request('/applications', {
        method: 'POST',
        body: appData,
      })
    },

    async update(id, appData) {
      return request(`/applications/${id}`, {
        method: 'PUT',
        body: appData,
      })
    },

    async delete(id) {
      return request(`/applications/${id}`, {
        method: 'DELETE',
      })
    },
  },

  roadmap: {
    async get() {
      return request('/roadmap')
    },

    async generate() {
      return request('/roadmap/generate', {
        method: 'POST',
      })
    },

    async toggleTask(id, completed) {
      return request(`/roadmap/task/${id}`, {
        method: 'PUT',
        body: { completed },
      })
    },
  },

  skillgap: {
    async get() {
      return request('/skill-gap')
    },
  },

  readiness: {
    async get() {
      return request('/readiness')
    },
  },

  dashboard: {
    async get() {
      return request('/dashboard')
    },
  },

  jobs: {
    async search(params = {}) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          searchParams.append(key, Array.isArray(val) ? val.join(',') : val)
        }
      })
      const queryString = searchParams.toString()
      return request(`/jobs${queryString ? `?${queryString}` : ''}`)
    },

    async getCareerLinks() {
      return request('/jobs/career-links')
    },
  },
}

export default api
