import time
import random
import msvcrt  # For Windows only

easy_sentences = [
    "Practice makes perfect.",
    "Python is fun to learn.",
    "Typing is an essential skill.",
    "Code daily to improve.",
    "Focus helps you succeed."
]

medium_paragraphs = [
    "Typing tests are great for improving your speed and accuracy. With regular practice, you can type faster and more confidently.",
    "Python is a beginner-friendly programming language that is widely used in various fields like web development, data science, and automation.",
    "Good typing skills help you complete tasks faster, reduce fatigue, and allow you to focus more on the content rather than the keyboard.",
    "Technology continues to evolve at an exponential rate, and staying ahead of the curve is essential for those looking to make an impact in their fields. Continuous learning is the key.",
    "Effective communication is an important aspect of any profession. Whether you're sending emails or preparing presentations, strong writing and typing skills can make a huge difference."
]

hard_paragraphs = [
    "The rapid advancement of technology has made it essential for individuals to stay updated with the latest tools and programming languages. Python, in particular, has gained popularity due to its versatility and ease of use.",
    "Artificial intelligence is transforming the way industries operate. From automating repetitive tasks to making data-driven decisions, AI has become an integral part of modern technological solutions. Learning to code in Python gives you a head start in this field.",
    "Consistency, discipline, and curiosity are the three pillars of successful learning. Whether you're improving your typing speed or mastering a new programming concept, small steps taken daily lead to significant results over time.",
    "In the world of software development, clean and efficient code is highly valued. Not only does it ensure better performance, but it also reduces maintenance costs and makes it easier to collaborate with others.",
    "Data analysis has become an essential skill in many industries. With the increasing availability of large datasets, the ability to analyze and derive insights from this data is a critical competitive advantage."
]

# Level selection
print("*** Typing Speed Test ***\n")
print("Select a level:")
print("1. Easy")
print("2. Medium")
print("3. Experienced")

choice = input("Enter 1, 2, or 3: ")

if choice == '1':
    text = random.choice(easy_sentences)
elif choice == '2':
    text = random.choice(medium_paragraphs)
elif choice == '3':
    text = random.choice(hard_paragraphs)
else:
    print("Invalid choice. Defaulting to Medium level.")
    text = random.choice(medium_paragraphs)

# Display paragraph in green
print("\nType the following text as fast and accurately as you can:\n")
print(f"\033[92m{text}\033[0m\n")

input("Press Enter when you are ready to start...")

# Start typing
print("\nStart Typing:\n")
typed = ""
start_time = time.time()

# ✅ FIXED LOOP (stops when length matches)
while len(typed) < len(text):
    if msvcrt.kbhit():
        char = msvcrt.getwch()

        if char == '\r':  # Ignore Enter
            continue

        elif char == '\x08':  # Backspace
            if len(typed) > 0:
                typed = typed[:-1]
                print("\b \b", end='', flush=True)

        else:
            if len(typed) < len(text):  # Prevent overflow
                print(char, end='', flush=True)
                typed += char

end_time = time.time()

# Calculations
elapsed_time = end_time - start_time
word_count = len(text.split())
wpm = round((word_count / elapsed_time) * 60)

correct_chars = sum(
    1 for i in range(len(text)) if i < len(typed) and text[i] == typed[i]
)
accuracy = round((correct_chars / len(text)) * 100)

# Results
print("\n\n--- Results ---")
print(f"Time Taken: {round(elapsed_time, 2)} seconds")
print(f"Typing Speed: {wpm} WPM")
print(f"Accuracy: {accuracy}%")

# Comparison
if text != typed:
    print("\nOriginal Text:")
    print(text)
    print("\nYour Typing:")
    print(typed)