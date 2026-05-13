"use client";

import React, { useState } from 'react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Users, FileText, Settings, Download, Bell, Plus, Link as LinkIcon, Trash2, File, Calendar, BarChart2, Globe, Activity, ChevronDown } from 'lucide-react';

// Mock Data from PPT
const gscData = [
  { day: '1', clicks: 28, impressions: 550 },
  { day: '2', clicks: 25, impressions: 420 },
  { day: '3', clicks: 42, impressions: 440 },
  { day: '4', clicks: 24, impressions: 380 },
  { day: '5', clicks: 31, impressions: 430 },
  { day: '6', clicks: 31, impressions: 420 },
  { day: '7', clicks: 18, impressions: 500 },
];

const ga4Data = [
  { day: '05 May', users: 150 },
  { day: '06 May', users: 180 },
  { day: '07 May', users: 120 },
  { day: '08 May', users: 200 },
  { day: '09 May', users: 160 },
  { day: '10 May', users: 110 },
  { day: '11 May', users: 190 },
];

const cities = [
  { name: 'Bengaluru', users: 476, trend: '-5.7%', up: false },
  { name: 'Hyderabad', users: 20, trend: '-31.0%', up: false },
  { name: 'Chennai', users: 20, trend: '+17.6%', up: true },
  { name: 'Mumbai', users: 17, trend: '-5.6%', up: false },
  { name: 'Visakhapatnam', users: 14, trend: '+7.7%', up: true },
  { name: 'Boardman', users: 10, trend: '-9.1%', up: false },
  { name: 'Mysuru', users: 12, trend: '+50.0%', up: true },
];

const inputStyle = { width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--surface-border)', background: 'var(--surface-color)', color: 'var(--text-primary)', fontFamily: 'var(--font-inter)', outline: 'none' };
const btnOutlineStyle = { background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--surface-border)', borderRadius: '8px', padding: '10px 20px', fontFamily: 'var(--font-inter)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center' };
const selectStyle: React.CSSProperties = { padding: '8px 36px 8px 16px', borderRadius: '8px', border: '1px solid var(--surface-border)', background: 'var(--surface-color)', color: 'var(--text-primary)', fontFamily: 'var(--font-inter)', outline: 'none', appearance: 'none', cursor: 'pointer', fontWeight: 500 };

export default function Home() {
  const [activeTab, setActiveTab] = useState('gsc');
  const [showAddClient, setShowAddClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState('Brandbros');
  const [dateRange, setDateRange] = useState('Last 7 Days');

  const renderFilters = (title: string, subtitle: string) => (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
      <div>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>{title}</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>{subtitle}</p>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        
        {/* Client Selector */}
        <div style={{ position: 'relative' }}>
          <select style={selectStyle} value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)}>
            <option value="Brandbros">Brandbros</option>
            <option value="JustFeelIt">JustFeelIt</option>
            <option value="TalkingLands">TalkingLands</option>
          </select>
          <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)' }} />
        </div>

        {/* Date Range Selector */}
        <div style={{ position: 'relative' }}>
          <select style={selectStyle} value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
            <option value="Last 7 Days">Last 7 Days</option>
            <option value="Last 28 Days">Last 28 Days</option>
            <option value="Last 3 Months">Last 3 Months</option>
            <option value="Last 6 Months">Last 6 Months</option>
            <option value="Custom">Custom Range...</option>
          </select>
          <Calendar size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)' }} />
        </div>

        <button className="btn-primary">
          <Download size={18} /> Export Report
        </button>
      </div>
    </header>
  );

  const renderGSC = () => (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      {renderFilters('Google Search Console', `Showing search performance for ${selectedClient}`)}

      {/* GSC Scorecards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <div className="card glass-panel" style={{ padding: '24px', background: '#eef2ff', borderColor: '#c7d2fe' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <input type="checkbox" defaultChecked style={{ accentColor: '#4f46e5' }} />
            <h3 style={{ fontSize: '14px', color: '#4f46e5', margin: 0, fontWeight: 600 }}>Total clicks</h3>
          </div>
          <span style={{ fontSize: '32px', fontWeight: 700, color: '#312e81', display: 'block' }}>246</span>
          <span style={{ fontSize: '13px', color: '#6366f1' }}>Last 7 days</span>
        </div>

        <div className="card glass-panel" style={{ padding: '24px', background: '#f5f3ff', borderColor: '#ddd6fe' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <input type="checkbox" defaultChecked style={{ accentColor: '#7c3aed' }} />
            <h3 style={{ fontSize: '14px', color: '#7c3aed', margin: 0, fontWeight: 600 }}>Total impressions</h3>
          </div>
          <span style={{ fontSize: '32px', fontWeight: 700, color: '#4c1d95', display: 'block' }}>3.93k</span>
          <span style={{ fontSize: '13px', color: '#8b5cf6' }}>Last 7 days</span>
        </div>

        <div className="card glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <input type="checkbox" />
            <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, fontWeight: 500 }}>Average CTR</h3>
          </div>
          <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>6.3%</span>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Last 7 days</span>
        </div>

        <div className="card glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <input type="checkbox" />
            <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, fontWeight: 500 }}>Average position</h3>
          </div>
          <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>7.8</span>
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Last 7 days</span>
        </div>
      </div>

      {/* GSC Chart */}
      <div className="card glass-panel" style={{ height: '400px', padding: '32px', marginBottom: '24px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={gscData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" vertical={false} />
            <XAxis dataKey="day" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
            
            {/* Clicks Y-Axis (Left) */}
            <YAxis yAxisId="left" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
            
            {/* Impressions Y-Axis (Right) */}
            <YAxis yAxisId="right" orientation="right" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
            
            <Tooltip contentStyle={{ backgroundColor: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--surface-border)' }} />
            
            <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="#4f46e5" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
            <Line yAxisId="right" type="monotone" dataKey="impressions" stroke="#7c3aed" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Insight Box */}
      <div className="card glass-panel" style={{ padding: '24px', borderLeft: '4px solid #f59e0b', display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, fontSize: '16px', color: 'var(--text-primary)' }}>
          In the last 7 days, the website has received <strong style={{color: '#4c1d95'}}>3.93k impressions</strong>, <strong style={{color: '#312e81'}}>246 clicks</strong> and a consistent CTR of <strong>6.3%</strong>.
        </p>
      </div>
    </div>
  );

  const renderGA4 = () => (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      {renderFilters('Web Analytics (GA4)', `Showing traffic behavior for ${selectedClient}`)}

      {/* GA4 Scorecards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total users', value: '756', trend: '+10.2%', up: false },
          { label: 'New users', value: '507', trend: '+16.1%', up: true },
          { label: 'Engagement rate', value: '56.2%', trend: '+9.6%', up: true },
          { label: 'Returning users', value: '38.9%', trend: '+5.2%', up: false },
        ].map((stat, i) => (
          <div key={i} className="card glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '12px', fontWeight: 500 }}>{stat.label}</h3>
            <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>{stat.value}</span>
            <span style={{ fontSize: '13px', color: stat.up ? 'var(--success-color)' : 'var(--danger-color)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {stat.up ? '↑' : '↓'} {stat.trend}
            </span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* GA4 Chart */}
        <div className="card glass-panel" style={{ height: '400px', padding: '32px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={ga4Data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--surface-border)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--surface-border)' }} />
              <Area type="monotone" dataKey="users" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Cities Table */}
        <div className="card glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--surface-border)', textAlign: 'left', background: 'rgba(0,0,0,0.02)' }}>
                <th style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Town/City</th>
                <th style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'right' }}>Active Users</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                  <td style={{ padding: '12px 20px', fontWeight: 500, fontSize: '14px' }}>{city.name}</td>
                  <td style={{ padding: '12px 20px', textAlign: 'right', fontSize: '14px' }}>
                    {city.users} 
                    <span style={{ marginLeft: '12px', fontSize: '12px', color: city.up ? 'var(--success-color)' : 'var(--danger-color)' }}>
                      {city.up ? '↑' : '↓'} {city.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insight Box */}
      <div className="card glass-panel" style={{ padding: '24px', borderLeft: '4px solid #f59e0b', display: 'flex', alignItems: 'center' }}>
        <p style={{ margin: 0, fontSize: '16px', color: 'var(--text-primary)' }}>
          In the last 7 days, the website recorded <strong>756 total users</strong>, including <strong>507 new users</strong>, with an overall <strong>engagement rate of 56.2%</strong>, and the majority of traffic coming from Bangalore.
        </p>
      </div>
    </div>
  );

  const renderClients = () => (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Client Management</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage your clients and configure API connections.</p>
        </div>
        {!showAddClient && (
          <button className="btn-primary" onClick={() => setShowAddClient(true)}>
            <Plus size={18} /> Add New Client
          </button>
        )}
      </header>

      {showAddClient ? (
        <div className="card glass-panel" style={{ maxWidth: '800px' }}>
          <h2 style={{ marginBottom: '24px' }}>Add New Client</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>Client/Brand Name</label>
              <input type="text" placeholder="e.g. Brandbros" style={inputStyle} />
            </div>
            
            <h3 style={{ marginTop: '16px', fontSize: '18px', borderBottom: '1px solid var(--surface-border)', paddingBottom: '8px' }}>Properties & Integrations</h3>
            
            {/* GSC */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(0,0,0,0.03)', padding: '16px', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Search size={24} color="#4285F4" />
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>Google Search Console (GSC) Domain</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Enter the exact URL property (e.g. https://brandbros.com/)</p>
                  </div>
                </div>
              </div>
              <input type="text" placeholder="sc-domain:brandbros.com or https://brandbros.com/" style={{ ...inputStyle, background: 'var(--surface-color)' }} />
            </div>

            {/* GA4 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(0,0,0,0.03)', padding: '16px', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <BarChart2 size={24} color="#F4B400" />
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '16px' }}>Google Analytics (GA4) Property ID</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>Enter the 9-digit GA4 Property ID.</p>
                  </div>
                </div>
              </div>
              <input type="text" placeholder="e.g. 348291034" style={{ ...inputStyle, background: 'var(--surface-color)' }} />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', borderTop: '1px solid var(--surface-border)', paddingTop: '24px' }}>
              <button className="btn-primary" onClick={() => setShowAddClient(false)}>Save Client Configuration</button>
              <button style={btnOutlineStyle} onClick={() => setShowAddClient(false)}>Cancel</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--surface-border)', textAlign: 'left', background: 'rgba(0,0,0,0.03)' }}>
                <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 500 }}>Client Name</th>
                <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 500 }}>GSC Property</th>
                <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 500 }}>GA4 Property ID</th>
                <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {[{name: 'Brandbros', gsc: 'sc-domain:brandbros.com', ga4: '348291034'}, {name: 'JustFeelIt', gsc: 'https://justfeelit.in/', ga4: '984729102'}, {name: 'TalkingLands', gsc: 'https://talkinglands.com/', ga4: '128472910'}].map((client, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--surface-border)', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.02)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '16px 24px', fontWeight: 600 }}>{client.name}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{client.gsc}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontFamily: 'monospace' }}>{client.ga4}</td>
                  <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--danger-color)', cursor: 'pointer', padding: '8px', borderRadius: '8px' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  const renderReports = () => (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Saved Reports</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>View and download previously generated reports.</p>
      </header>
      <div className="card glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--surface-border)', textAlign: 'left', background: 'rgba(0,0,0,0.03)' }}>
              <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 500 }}>Report Name</th>
              <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 500 }}>Client</th>
              <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 500 }}>Date Generated</th>
              <th style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontWeight: 500, textAlign: 'right' }}>Download</th>
            </tr>
          </thead>
          <tbody>
            {[
              {name: 'May Weekly SEO Report', client: 'Brandbros', date: 'May 12, 2026'},
              {name: 'April 2026 Monthly Report', client: 'JustFeelIt', date: 'May 1, 2026'},
            ].map((report, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                <td style={{ padding: '16px 24px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '12px' }}><File size={18} color="var(--primary-accent)" /> {report.name}</td>
                <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{report.client}</td>
                <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={16} /> {report.date}</td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <button className="btn-primary" style={{ padding: '6px 12px', fontSize: '12px' }}><Download size={14} /> PPT</button>
                  <button style={{ ...btnOutlineStyle, padding: '6px 12px', fontSize: '12px', marginLeft: '8px', display: 'inline-flex' }}><Download size={14} style={{marginRight:'6px'}}/> PDF</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div style={{ animation: 'fadeIn 0.3s' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Global Settings</h1>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Configure agency details and default report settings.</p>
      </header>
      <div className="card glass-panel" style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>Agency Name</label>
            <input type="text" defaultValue="Laukika" style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontWeight: 500 }}>Agency Logo URL</label>
            <input type="url" defaultValue="https://www.laukika.com/wp-content/uploads/2025/10/logo-1-1-3.gif" style={inputStyle} />
          </div>
          <div style={{ marginTop: '16px', borderTop: '1px solid var(--surface-border)', paddingTop: '24px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '16px' }}>Master Google Cloud Account</h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Upload your Google Cloud Service Account JSON file here. This single account will be used to access all client GA4 and GSC properties.</p>
            <button style={btnOutlineStyle}><FileText size={18} style={{marginRight: '8px'}}/> Upload service-account.json</button>
          </div>
          <button className="btn-primary" style={{ marginTop: '16px', width: 'fit-content' }}>Save Settings</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw' }}>
      {/* Sidebar */}
      <aside style={{ width: 'var(--sidebar-width)', backgroundColor: 'var(--surface-color)', borderRight: '1px solid var(--surface-border)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <img src="https://www.laukika.com/wp-content/uploads/2025/10/logo-1-1-3.gif" alt="Laukika Logo" style={{ width: '100%', maxWidth: '180px', objectFit: 'contain' }} />
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '12px', marginBottom: '8px' }}>Dashboards</p>
          {[
            { id: 'gsc', icon: <Search size={18} />, label: 'Search Console' },
            { id: 'ga4', icon: <BarChart2 size={18} />, label: 'Web Analytics' },
            { id: 'bing', icon: <Globe size={18} />, label: 'Bing Webmaster' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px',
                borderRadius: '8px', border: 'none', background: activeTab === item.id ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                color: activeTab === item.id ? 'var(--primary-accent)' : 'var(--text-secondary)',
                cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', fontWeight: 500, fontFamily: 'var(--font-inter)'
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}

          <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '24px', marginBottom: '8px' }}>Management</p>
          {[
            { id: 'clients', icon: <Users size={18} />, label: 'Clients & APIs' },
            { id: 'reports', icon: <FileText size={18} />, label: 'Saved Reports' },
            { id: 'settings', icon: <Settings size={18} />, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px',
                borderRadius: '8px', border: 'none', background: activeTab === item.id ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                color: activeTab === item.id ? 'var(--primary-accent)' : 'var(--text-secondary)',
                cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left', fontWeight: 500, fontFamily: 'var(--font-inter)'
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '32px 48px', overflowY: 'auto' }}>
        {activeTab === 'gsc' && renderGSC()}
        {activeTab === 'ga4' && renderGA4()}
        {activeTab === 'bing' && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--text-secondary)' }}>
            <h2>Bing Webmaster tools integration coming soon...</h2>
          </div>
        )}
        {activeTab === 'clients' && renderClients()}
        {activeTab === 'reports' && renderReports()}
        {activeTab === 'settings' && renderSettings()}
      </main>
    </div>
  );
}
