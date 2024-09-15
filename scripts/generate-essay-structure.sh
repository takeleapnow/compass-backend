curl \
  -X POST \
  -H "content-type: application/json" \
  localhost:3001/editor/essay/structure/generate \
  --data-binary @- <<EOF
{
  "essay_prompt": "How will an MBA from Chicago Booth- from the Evening MBA Program or Weekend MBA Program specifically- at this point in your life help you achieve both your short- and long-term goals??"
}
EOF