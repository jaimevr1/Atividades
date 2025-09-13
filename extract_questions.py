#!/usr/bin/env python3
"""
Extract questions from operacoes_matematicas.html and convert to database format.
This script processes the hardcoded question blocks and generates database entries.
"""

import re
import json
from typing import List, Dict, Any

def extract_questions_from_html(file_path: str) -> List[Dict[str, Any]]:
    """Extract all questions from the HTML file."""

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the problemBlocks array
    match = re.search(r'const problemBlocks = \[(.*?)\];', content, re.DOTALL)
    if not match:
        print("Could not find problemBlocks array")
        return []

    # Extract each block manually by parsing the structure
    blocks = []
    questions = []
    question_id = 1

    # Define contexts based on question content
    contexts = {
        'roblox': 'toys',
        'minecraft': 'toys',
        'vídeos': 'general',
        'doces': 'home',
        'tênis': 'general',
        'carros': 'vehicles',
        'escola': 'school',
        'loja': 'shopping',
        'fazenda': 'farm',
        'casa': 'home'
    }

    # Extract raw question blocks using regex patterns
    block_pattern = r'// Bloco \d+:.*?\[(.*?)\],'
    question_pattern = r'\{[^}]*text:\s*"([^"]*)"[^}]*operation:\s*"([^"]*)"[^}]*explanation:\s*"([^"]*)"[^}]*calculation:\s*"([^"]*)"[^}]*\}'

    # Parse each block
    for block_match in re.finditer(block_pattern, content, re.DOTALL):
        block_content = block_match.group(1)

        # Extract questions from this block
        for question_match in re.finditer(question_pattern, block_content, re.DOTALL):
            text = question_match.group(1)
            operation = question_match.group(2)
            explanation = question_match.group(3)
            calculation = question_match.group(4)

            # Determine context based on keywords in text
            context = 'general'
            for keyword, ctx in contexts.items():
                if keyword.lower() in text.lower():
                    context = ctx
                    break

            # Determine difficulty
            difficulty = 'easy'  # Default
            if question_id <= 45:  # First 45 questions (blocks 1-9)
                difficulty = 'easy'
            elif question_id <= 90:  # Next 45 questions (blocks 10-18)
                difficulty = 'medium'
            else:  # Last 45 questions
                difficulty = 'hard'

            # Extract numbers from calculation for mathematics data
            numbers = re.findall(r'\d+', calculation)
            result = None
            if '=' in calculation:
                result_match = re.search(r'= (\d+)', calculation)
                if result_match:
                    result = int(result_match.group(1))

            question = {
                "id": f"op_id_{question_id:03d}",
                "statement": text,
                "subject": "Matemática",
                "context": context,
                "difficulty": difficulty,
                "ageRange": "8-12",
                "originalActivity": "Quiz de Identificação de Operações Matemáticas",
                "mathematics": {
                    "operation": operation,
                    "numbers": [int(n) for n in numbers] if numbers else [],
                    "result": result,
                    "explanation": explanation,
                    "calculation": calculation
                },
                "competencies": {
                    "operation_identification": {
                        "type": "multiple_choice",
                        "question": f"Qual operação matemática deve ser usada para resolver: \"{text}\"?",
                        "options": ["adição", "subtração", "multiplicação", "divisão"],
                        "correctAnswer": operation,
                        "explanation": explanation
                    }
                },
                "audio": {
                    "enunciado": f"matematica/bloco_{(question_id-1)//15 + 1:02d}/bloco_{(question_id-1)//15 + 1:02d}_questao_{((question_id-1)%15)+1}_enunciado.mp3",
                    "explicacao": f"matematica/bloco_{(question_id-1)//15 + 1:02d}/bloco_{(question_id-1)//15 + 1:02d}_questao_{((question_id-1)%15)+1}_explicacao.mp3"
                }
            }

            questions.append(question)
            question_id += 1

    return questions

def main():
    """Main function to extract and save questions."""

    # Extract questions
    questions = extract_questions_from_html('/mnt/c/users/jaime/documents/github/atividades/pages/operacoes_matematicas.html')

    print(f"Extracted {len(questions)} questions")

    # Save to JSON file
    output_file = '/mnt/c/users/jaime/documents/github/atividades/src/data/operation_identification_questions.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(questions, f, indent=2, ensure_ascii=False)

    print(f"Questions saved to {output_file}")

    # Print summary
    operations = {}
    contexts = {}
    difficulties = {}

    for q in questions:
        op = q['mathematics']['operation']
        operations[op] = operations.get(op, 0) + 1

        ctx = q['context']
        contexts[ctx] = contexts.get(ctx, 0) + 1

        diff = q['difficulty']
        difficulties[diff] = difficulties.get(diff, 0) + 1

    print("\nSummary:")
    print(f"Operations: {operations}")
    print(f"Contexts: {contexts}")
    print(f"Difficulties: {difficulties}")

if __name__ == "__main__":
    main()