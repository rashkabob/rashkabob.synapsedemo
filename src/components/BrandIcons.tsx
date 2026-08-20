import React from 'react';

// NVIDIA Synapse Logo
export const NvidiaLogo: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 8C26.8 8 8 26.8 8 50s18.8 42 42 42c22.5 0 40.8-17.7 41.9-40H73.8C72.8 53.3 62.4 63.8 50 63.8c-13.1 0-23.8-10.7-23.8-23.8 0-13.1 10.7-23.8 23.8-23.8 8.4 0 15.8 4.4 20 11H92C86.7 13.9 69.8 8 50 8z"
      fill="#76B900"
    />
    <path
      d="M50 25c-8.3 0-15 6.7-15 15s6.7 15 15 15c6.5 0 12-4.1 14.1-10h14.4C70.8 53.6 61.3 61 50 61c-11.6 0-21-9.4-21-21s9.4-21 21-21c8.1 0 15.2 4.6 18.6 11.4l-11.1 5.6C56 34.2 53.2 33 50 33c-3.9 0-7 3.1-7 7s3.1 7 7 7c2.8 0 5.2-1.6 6.3-4H43v-6h27.8c.1.7.2 1.3.2 2 0 11-9 20-21 20-11.6 0-21-9.4-21-21s9.4-21 21-21c8.6 0 16 5.2 19.3 12.6l6.8-3.4C71.7 28.5 61.6 25 50 25z"
      fill="#76B900"
    />
  </svg>
);

// Slack Icon
export const SlackIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 127 127" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80z" fill="#E01E5A"/>
    <path d="M34 80c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33.2c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z" fill="#E01E5A"/>
    <path d="M47.2 27.2c-7.3 0-13.2-5.9-13.2-13.2C34 6.7 39.9.8 47.2.8c7.3 0 13.2 5.9 13.2 13.2v13.2H47.2z" fill="#36C5F0"/>
    <path d="M47.2 34c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H14C6.7 60.4.8 54.5.8 47.2c0-7.3 5.9-13.2 13.2-13.2h33.2z" fill="#36C5F0"/>
    <path d="M100 47.2c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H100V47.2z" fill="#2EB67D"/>
    <path d="M93.2 47.2c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V14c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33.2z" fill="#2EB67D"/>
    <path d="M80 100c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V100H80z" fill="#ECB22E"/>
    <path d="M80 93.2c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33.2c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H80z" fill="#ECB22E"/>
  </svg>
);

// Outlook / Email Icon (Blue folded icon matching the screenshot)
export const OutlookIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="10" fill="#0078D4"/>
    <path d="M12 16C12 14.8954 12.8954 14 14 14H34C35.1046 14 36 14.8954 36 16V32C36 33.1046 35.1046 34 34 34H14C12.8954 34 12 33.1046 12 32V16Z" fill="white" fillOpacity="0.2"/>
    <path d="M12 16L24 25L36 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 32V16H36V32H12Z" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
  </svg>
);

// Jira Icon
export const JiraIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="5" fill="#0052CC"/>
    <path d="M12 3.5L7 8.5L12 13.5L17 8.5L12 3.5Z" fill="white"/>
    <path d="M12 10.5L7 15.5L12 20.5L17 15.5L12 10.5Z" fill="white" fillOpacity="0.7"/>
  </svg>
);

// Microsoft Teams Icon (Matching image 3)
export const TeamsIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="7" fill="#5B5FC7"/>
    <circle cx="21" cy="11" r="3" fill="#7B83EB"/>
    <path d="M17 17C17 15.3431 18.3431 14 20 14H22C23.6569 14 25 15.3431 25 17V21H17V17Z" fill="#7B83EB"/>
    <circle cx="13" cy="12" r="3.5" fill="white"/>
    <path d="M7 19C7 16.7909 8.79086 15 11 15H15C17.2091 15 19 16.7909 19 19V23H7V19Z" fill="white"/>
    <rect x="5" y="10" width="12" height="12" rx="2.5" fill="#464EB8"/>
    <text x="8.5" y="19" fill="white" fontSize="9" fontWeight="bold" fontFamily="sans-serif">T</text>
  </svg>
);

// Google Calendar Icon
export const GoogleCalendarIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="48" height="48" rx="10" fill="white" stroke="#E2E8F0" strokeWidth="1.5"/>
    <path d="M10 14H38V38H10V14Z" fill="#4285F4"/>
    <rect x="10" y="10" width="28" height="8" fill="#1A73E8"/>
    <rect x="16" y="7" width="3" height="5" rx="1" fill="#EA4335"/>
    <rect x="29" y="7" width="3" height="5" rx="1" fill="#EA4335"/>
    <text x="18" y="30" fill="white" fontSize="14" fontWeight="bold" fontFamily="sans-serif">31</text>
  </svg>
);

// Priorities Icon (Green matching the screenshot)
export const PrioritiesIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <div className={`flex items-center justify-center rounded-md bg-[#76B900] text-white ${className}`}>
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  </div>
);

// Executive Summary Document Icon (Green rounded square with lines)
export const ExecutiveSummaryIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <div className={`flex items-center justify-center rounded-lg bg-[#76B900] text-white p-1 ${className}`}>
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <polyline points="14 2 14 8 20 8"></polyline>
      <line x1="16" y1="13" x2="8" y2="13"></line>
      <line x1="16" y1="17" x2="8" y2="17"></line>
      <polyline points="10 9 9 9 8 9"></polyline>
    </svg>
  </div>
);

// Figma Icon
export const FigmaIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
  </svg>
);

// GitHub Icon
export const GitHubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// Notion Icon
export const NotionIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.83c-.42-.326-.981-.7-2.055-.607L3.01 2.296c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.213.98l14.523-.84c.84-.046.933-.56.933-1.167V6.354c0-.606-.233-.933-.746-.886l-15.177.886c-.56.047-.746.373-.746.934zm13.636.98v10.965l-2.054.14V8.408zm-3.5 11.058l-4.573-7.232v6.86l-1.96.14V7.94l2.427-.14 4.526 7.186v-6.72l2.007-.14v11.192z" />
  </svg>
);

