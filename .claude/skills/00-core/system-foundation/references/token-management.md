# Token Management

## Context Window Management

### Strategies

1. **Chunking**: Split large content into manageable pieces
2. **Summarization**: Compress repeated information
3. **Prioritization**: Focus on most relevant context
4. **Pruning**: Remove unnecessary conversation history

### Limits

- Default context: 200K tokens
- Per-message limit: 8K tokens
- System prompt: 32K tokens

## Optimization Tips

- Use file references instead of embedding large files
- Prefer terminal commands over verbose explanations
- Ask clarifying questions to narrow context
- Break complex tasks into sequential simpler tasks

## Memory Techniques

### Short-term
- Active conversation context
- Current task state
- Recent tool outputs

### Long-term
- AGENTS.md files
- Skills repository
- External documentation

## Token Counting

```javascript
// Rough estimation
const tokens = Math.ceil(text.length / 4);
```
