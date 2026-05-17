import React, { useState, useRef } from 'react'
import "../style/Generate.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { Home, History } from 'lucide-react' // Import Home icon
import Loading from '../../others/components/Loading.jsx'
import AnimatedBackground from '../../others/components/AnimatedBackground.jsx';

const Generate = () => {

    const { loading, generateReport, reports } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()
    
    // State to manage the sliding drawer visibility
    const [ isDrawerOpen, setIsDrawerOpen ] = useState(false)
    
    // New separate state to track AI strategy creation specifically
    const [ isGenerating, setIsGenerating ] = useState(false)

    const handleGenerateReport = async () => {
        try {
            setIsGenerating(true) // Turn on the loading screen immediately when clicked
            const resumeFile = resumeInputRef.current.files[ 0 ]
            const data = await generateReport({ jobDescription, selfDescription, resumeFile })
            navigate(`/interview/${data._id}`)
        } catch (error) {
            console.error("Error generating report:", error)
            setIsGenerating(false) // Fallback to turn off loading screen if API fails
        }
    }

    // Displays the loader during initial layout fetching OR while AI engine calculates response
    if (loading || isGenerating) {
        return (
            <Loading/>
        )
    }

    return (
        <div className='home-page'>
            <div className="bg-animation-layer">
                <AnimatedBackground />
            </div>
            {/* Top Navigation Row - Separating Home to Left and History to Right */}
            {/* Full-width Top Navigation Anchor Bar */}
            <div className="top-nav-bar">
                
                {/* 1. First Child = Left Anchor: Home Button */}
                <button 
                    onClick={() => navigate("/")} 
                    className="home2-nav-btn"
                    aria-label="Go to Home"
                >
                    <div className="logo">resume<span className="dot">CO.</span></div>
                </button>

                {/* 2. Second Child = Right Anchor: History Button */}
                {reports && reports.length > 0 ? (
                    <button 
                        onClick={() => setIsDrawerOpen(true)}
                        className="home1-nav-btn recents-toggle-btn"
                        style={{ position: 'relative' }} // Ensures the badge anchors to the outer button border
                    >
                        <History size={20} />
                        <span>History</span>

                        {/* The Ping Animation Badge shifted onto the button layout frame */}
                        <span className="button-ping-badge">
                            <span className="button-ping-badge__pulse"></span>
                            <span className="button-ping-badge__dot"></span>
                        </span>
                    </button>
                ) : (
                    <div /> /* Keeps space-between alignment tracking perfectly when history is empty */
                )}
                
            </div>

            {/* Page Header */}
            <header className='page-header'>
                <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </header>

            {/* Main Card */}
            <div className='interview-card'>
                <div className='interview-card__body'>

                    {/* Left Panel - Job Description */}
                    <div className='panel panel--left'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2>Target Job Description</h2>
                            <span className='badge badge--required'>Required</span>
                        </div>
                        <textarea
                            value={jobDescription}
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            className='panel__textarea'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        
                        {/* Dynamic styling and text swap depending on character thresholds */}
                        <div 
                            className='char-counter'
                            style={{
                                color: jobDescription.length > 0 ? '#ef3d7b' : 'inherit',
                                fontWeight: jobDescription.length === 5000 ? '600' : 'normal'
                            }}
                        >
                            {jobDescription.length === 5000 ? (
                                <span>Limit reached!</span>
                            ) : (
                                <span>{jobDescription.length} / 5000 chars</span>
                            )}
                        </div>
                    </div>

                    {/* Vertical Divider */}
                    <div className='panel-divider' />

                    {/* Right Panel - Profile */}
                    <div className='panel panel--right'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2>Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className='upload-section'>
                            <label className='section-label'>
                                Upload Resume
                                <span className='badge badge--best'>Best Results</span>
                            </label>
                            <label className='dropzone' htmlFor='resume'>
                                <span className='dropzone__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                </span>
                                <p className='dropzone__title'>Click to upload or drag &amp; drop</p>
                                <p className='dropzone__subtitle'>PDF or DOCX (Max 5MB)</p>
                                <input ref={resumeInputRef} hidden type='file' id='resume' name='resume' accept='.pdf,.docx' />
                            </label>
                        </div>

                        {/* OR Divider */}
                        <div className='or-divider'><span>OR</span></div>

                        {/* Quick Self-Description */}
                        <div className='self-description'>
                            <label className='section-label' htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                id='selfDescription'
                                name='selfDescription'
                                className='panel__textarea panel__textarea--short'
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className='info-box'>
                            <span className='info-box__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                            </span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className='interview-card__footer'>
                    <span className='footer-info'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        className='generate-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* Backdrop Dim Overlay */}
            {isDrawerOpen && reports && reports.length > 0 && (
                <div className='drawer-overlay' onClick={() => setIsDrawerOpen(false)}></div>
            )}

            {/* Neo-Magenta Dark Theme Recent Reports Drawer */}
            {reports && reports.length > 0 && (
                <section className={`recent-reports-drawer ${isDrawerOpen ? 'open' : ''}`}>
                    <div className='drawer-header'>
                        <h2>My Recent Interview Plans</h2>
                        <button className='btn-close-drawer' onClick={() => setIsDrawerOpen(false)}>
                            &times;
                        </button>
                    </div>
                    <ul className='reports-list'>
                        {reports.map(report => (
                            <li 
                                key={report._id} 
                                className='report-item' 
                                onClick={() => {
                                    navigate(`/interview/${report._id}`);
                                    setIsDrawerOpen(false); 
                                }}
                            >
                                <h3>{report.title || 'Untitled Position'}</h3>
                                <p className='report-meta'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`match-score ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Page Footer */}
            <footer className='page-footer'>
                <a href='#'>Privacy Policy</a>
                <a href='#'>Terms of Service</a>
                <a href='#'>Help Center</a>
            </footer>
        </div>
    )
}

export default Generate