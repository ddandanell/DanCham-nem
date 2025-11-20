# DanCham Member Survey 2025

A bilingual (English/Danish) member satisfaction survey for the Danish-Indonesian Business Chamber (DanCham).

## 🎯 Features

- **15 comprehensive questions** covering membership satisfaction, events, communication, and NPS
- **Bilingual support**: Toggle between English and Danish
- **Progressive disclosure**: One question at a time for better focus
- **Responsive design**: Works on desktop, tablet, and mobile
- **Smart validation**: Required fields are clearly marked
- **Anonymous option**: Users can choose to remain anonymous or share contact details
- **Email integration**: All responses sent to designated email via FormSubmit.co

## 🚀 Quick Start

1. Open `index.html` in a web browser or deploy to any web host
2. The survey is a single HTML file with no external dependencies
3. Complete the [first-time email activation](FORMSUBMIT_SETUP.md#-first-time-activation-required)

## 📧 Email Setup

Survey responses are automatically sent to `Daviddandanell@gmail.com` using FormSubmit.co.

**Important**: First-time setup requires email confirmation. See [FORMSUBMIT_SETUP.md](FORMSUBMIT_SETUP.md) for detailed instructions.

## 📋 Survey Questions

1. Overall membership satisfaction
2. Main reason for joining
3. Expectations met
4. Value for money
5. Activities participation
6. Event quality
7. Event improvements
8. Business/social balance
9. Missing content/themes
10. Communication frequency
11. Missing information
12. NPS score (0-10)
13. NPS reason
14. Additional comments
15. Follow-up permission

Plus optional contact details (name, email, WhatsApp) for follow-up.

## 🛠 Technical Details

- **No build process**: Pure HTML, CSS, and JavaScript
- **No external dependencies**: Everything in one file
- **Local storage**: Saves progress automatically
- **Modern browsers**: Works in all current browsers
- **Mobile-first**: Responsive design

## 📁 Files

- `index.html` - Main survey application
- `image.png` - DanCham logo
- `FORMSUBMIT_SETUP.md` - Email setup instructions
- `README.md` - This file

## 🔧 Customization

### Change Email Address
Edit line 762 in `index.html`:
```html
action="https://formsubmit.co/ajax/YOUR-EMAIL@example.com"
```

### Modify Questions
Questions are defined starting at line 797 in the `QUESTIONS_EN` array.

### Update Styling
CSS styles are in the `<style>` section starting at line 7.

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

Copyright © 2025 Danish-Indonesian Business Chamber. All rights reserved.

## 📞 Contact

**Danish-Indonesian Business Chamber**  
Alamanda Tower 23rd Floor Unit B  
Jl. TB Simatupang Kav 23-24  
12430 Jakarta, Indonesia  

Website: [dancham.id](https://dancham.id/)
