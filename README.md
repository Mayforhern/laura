# Laura3.0 - AI-Powered Mental Health Platform

Laura3.0 is a comprehensive mental health platform that combines AI-powered insights, community support, and wearable device integration to provide personalized mental wellness solutions.

## Features

- 🤖 **AI-Powered Insights**: Leverages Google's Gemini AI to provide personalized health insights and recommendations
- 💬 **Community Support**: Real-time chat rooms and community forums for peer support
- ⌚ **Wearable Integration**: Seamless connection with Fitbit devices for health data tracking
- �� **Health Analytics**: Comprehensive analysis of sleep patterns, activity levels, and mood trends
- 🎯 **Personalized Recommendations**: AI-generated exercise plans and mood improvement suggestions
- 🔒 **Secure Authentication**: Powered by Privy for secure user authentication
- 🌐 **Web3 Integration**: Built with blockchain technology for secure data management

## Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Node.js, MongoDB
- **AI**: Google Gemini AI
- **Authentication**: Privy
- **Wearable Integration**: Fitbit API
- **Real-time Communication**: WebSocket
- **Blockchain**: Ethereum (via Privy)

## Getting Started

1. Clone the repository:
```bash
git clone [https://github.com/Mayforhern/laura]
cd laura-master
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Fill in your environment variables
```

4. Run the development server:
```bash
npm run dev
```

## Environment Variables

Required environment variables:
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_PRIVY_APP_ID`
- `NEXT_PUBLIC_GEMINI_API_KEY`
- `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`
- `MONGODB_URI`
- `NEXT_PUBLIC_FITBIT_CLIENT_ID`
- `FITBIT_CLIENT_SECRET`
- `PRIVY_APP_SECRET`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Gemini AI for providing the AI capabilities
- Privy for authentication services
- Fitbit for wearable device integration
- The open-source community for various tools and libraries

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
