curl \
  -X POST \
  -H "content-type: application/json" \
  -d '{
    "student_name": "Abhishek Kumar",
    "applied_program": "Masters of Science in Computer Science in Cambridge",
    "recommender": "Manu Basavaraju, professor of Computer Science in NITK",
    "key_strengths": "Problem solving skills, discipline and enthusiasm for learning",
    "success_reasons": "Dedication, persistence",
    "examples": "published a paper in second year of college, graduated with 3.4 CGPA"
  }' \
  localhost:3001/editor/letter_of_recommendation/generate