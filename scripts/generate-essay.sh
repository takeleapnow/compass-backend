curl \
  -X POST \
  -H "content-type: application/json" \
  localhost:3001/editor/essay/generate \
  --data @- << EOF
{
    "structure": {
        "Introduction": {
            "description": "Start by introducing yourself briefly and highlighting your current career stage. State your clear and concise short- and long-term goals.  Connect your goals to the specific MBA program you've chosen (Evening or Weekend) and explain why Chicago Booth is the ideal institution for you.",
            "user_input_values": {
                "Current career stage": "Currently working as a software engineer to Google",
                "Short-term goal": "Want to transistion into product role",
                "Long-term goal": "I aspire to lead a successful marketing team for a tech startup",
                "Reasons for choosing the specific program": "The flexibility of the Evening program aligns with my current work schedule",
                "Reasons for choosing Chicago Booth": "Chicago Booth's strong alumni network and focus on leadership development are invaluable for my goals"
            }
        },
        "Short-Term Goals and How the MBA Helps": {
            "description": "Elaborate on your short-term goal. Explain how the specific courses, faculty, and resources within the chosen program (Evening or Weekend) will equip you with the necessary skills and knowledge to achieve it. Provide concrete examples to support your claims.",
            "user_input_values": {
                "Specific courses relevant to your short-term goal": "Introduction to User Experience, Product Engineer 101",
                "How faculty expertise will support you": "Interactive and simulation-based group projects will help ready me for the future challenges",
                "Resources (e.g., career services, networking events) that will aid you": "Will be able to get a job sooner"
            }
        },
        "Conclusion": {
            "description": "Summarize your key points. Reiterate your strong desire to join Chicago Booth and how the MBA will be a transformative experience, propelling you towards your goals. End on a positive and compelling note.",
            "user_input_values": [
                "Summarized key points about your short- and long-term goals",
                "Reiteration of your enthusiasm for Chicago Booth and the program"
            ]
        }
    }
}
EOF