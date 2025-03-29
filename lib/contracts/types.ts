export interface TherapyServiceManager {
  sessions(sessionId: number): Promise<{
    encryptedConversation: string;
    // Add other session properties as needed
  }>;

  updateSession(
    sessionId: number,
    encryptedResponse: string,
    signature: string
  ): Promise<void>;

  on(
    event: "NewSessionStarted" | "EmergencyTriggered",
    listener: (sessionId: number, patient: string) => void
  ): void;
}
