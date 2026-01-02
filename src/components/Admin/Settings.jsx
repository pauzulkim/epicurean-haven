import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSave, faUpload, faPalette,
  faBell, faShieldAlt, faUsers,
  faGlobe, faEnvelope, faChartBar,
  faDatabase, faKey, faUserShield,
  faCog
} from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
  const [settings, setSettings] = useState({
    restaurantName: "Gourmet Restaurant",
    email: "contact@gourmet-restaurant.com",
    phone: "+62 21 1234 5678",
    address: "Jl. Sudirman No. 123, Jakarta",
    currency: "IDR",
    timezone: "Asia/Jakarta",
    notificationEmail: true,
    notificationSMS: false,
    maintenanceMode: false,
    allowRegistration: true,
    analyticsEnabled: true,
    backupFrequency: "daily"
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // Save settings logic
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-page">
      <div className="admin-header">
        <h2>
          <FontAwesomeIcon icon={faCog} />
          Settings
        </h2>
        <button className="btn btn-primary" onClick={handleSave}>
          <FontAwesomeIcon icon={faSave} />
          Save Changes
        </button>
      </div>

      <div className="settings-container">
        <div className="row">
          {/* General Settings */}
          <div className="col-12 col-lg-6">
            <div className="settings-card">
              <div className="settings-header">
                <FontAwesomeIcon icon={faGlobe} />
                <h4>General Settings</h4>
              </div>
              <div className="settings-body">
                <div className="form-group">
                  <label>Restaurant Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="restaurantName"
                    value={settings.restaurantName}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Contact Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={settings.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={settings.phone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>Address</label>
                  <textarea
                    className="form-control"
                    name="address"
                    value={settings.address}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>
                
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Currency</label>
                      <select
                        className="form-control"
                        name="currency"
                        value={settings.currency}
                        onChange={handleInputChange}
                      >
                        <option value="IDR">IDR (Rp)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Timezone</label>
                      <select
                        className="form-control"
                        name="timezone"
                        value={settings.timezone}
                        onChange={handleInputChange}
                      >
                        <option value="Asia/Jakarta">Asia/Jakarta</option>
                        <option value="Asia/Singapore">Asia/Singapore</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="col-12 col-lg-6 mt-4 mt-lg-0">
            <div className="settings-card">
              <div className="settings-header">
                <FontAwesomeIcon icon={faBell} />
                <h4>Notification Settings</h4>
              </div>
              <div className="settings-body">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="notificationEmail"
                    name="notificationEmail"
                    checked={settings.notificationEmail}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="notificationEmail">
                    Email Notifications
                  </label>
                  <small className="d-block text-muted">
                    Receive email notifications for new orders and important updates
                  </small>
                </div>
                
                <div className="form-check form-switch mt-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="notificationSMS"
                    name="notificationSMS"
                    checked={settings.notificationSMS}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="notificationSMS">
                    SMS Notifications
                  </label>
                  <small className="d-block text-muted">
                    Receive SMS notifications for urgent matters
                  </small>
                </div>
                
                <div className="form-group mt-4">
                  <label>Notification Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="notifications@restaurant.com"
                    defaultValue="admin@gourmet-restaurant.com"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="col-12 col-lg-6 mt-4">
            <div className="settings-card">
              <div className="settings-header">
                <FontAwesomeIcon icon={faShieldAlt} />
                <h4>Security Settings</h4>
              </div>
              <div className="settings-body">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="maintenanceMode"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="maintenanceMode">
                    Maintenance Mode
                  </label>
                  <small className="d-block text-muted">
                    Temporarily disable public access to the website
                  </small>
                </div>
                
                <div className="form-check form-switch mt-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="allowRegistration"
                    name="allowRegistration"
                    checked={settings.allowRegistration}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="allowRegistration">
                    Allow New Registrations
                  </label>
                  <small className="d-block text-muted">
                    Allow new customers to register accounts
                  </small>
                </div>
                
                <div className="mt-4">
                  <button className="btn btn-outline-primary">
                    <FontAwesomeIcon icon={faKey} />
                    Change Admin Password
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div className="col-12 col-lg-6 mt-4">
            <div className="settings-card">
              <div className="settings-header">
                <FontAwesomeIcon icon={faChartBar} />
                <h4>Advanced Settings</h4>
              </div>
              <div className="settings-body">
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="analyticsEnabled"
                    name="analyticsEnabled"
                    checked={settings.analyticsEnabled}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="analyticsEnabled">
                    Enable Analytics
                  </label>
                  <small className="d-block text-muted">
                    Collect and analyze website usage data
                  </small>
                </div>
                
                <div className="form-group mt-4">
                  <label>Auto Backup Frequency</label>
                  <select
                    className="form-control"
                    name="backupFrequency"
                    value={settings.backupFrequency}
                    onChange={handleInputChange}
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </div>
                
                <div className="mt-4">
                  <button className="btn btn-outline-info me-2">
                    <FontAwesomeIcon icon={faDatabase} />
                    Backup Database
                  </button>
                  <button className="btn btn-outline-warning">
                    <FontAwesomeIcon icon={faUpload} />
                    Restore Backup
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* API Settings */}
          <div className="col-12 mt-4">
            <div className="settings-card">
              <div className="settings-header">
                <FontAwesomeIcon icon={faUserShield} />
                <h4>API & Integration Settings</h4>
              </div>
              <div className="settings-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Payment Gateway API Key</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter API key"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Shipping Provider API</label>
                      <select className="form-control">
                        <option>JNE</option>
                        <option>TIKI</option>
                        <option>GoSend</option>
                        <option>GrabExpress</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;