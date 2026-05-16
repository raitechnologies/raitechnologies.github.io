/**
 * Simple Markdown Parser
 * Converts markdown to HTML for blog posts
 */

class MarkdownParser {
  static parse(markdown) {
    let html = markdown;

    // Headings
    html = html.replace(/^### (.*?)$/gm, '<h3 class="text-2xl font-bold mt-6 mb-3">$1</h3>');
    html = html.replace(/^## (.*?)$/gm, '<h2 class="text-3xl font-bold mt-8 mb-4">$1</h2>');
    html = html.replace(/^# (.*?)$/gm, '<h1 class="text-4xl font-bold mb-6">$1</h1>');

    // Code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/gm, '<pre class="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto mb-4"><code class="text-sm">$2</code></pre>');

    // Inline code
    html = html.replace(/`([^`]+)`/gm, '<code class="bg-zinc-900 px-2 py-1 rounded text-xs">$1</code>');

    // Bold and italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/gm, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/gm, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/gm, '<em>$1</em>');
    html = html.replace(/____(.*?)____/gm, '<strong><em>$1</em></strong>');
    html = html.replace(/__(.*?)__/gm, '<strong>$1</strong>');
    html = html.replace(/_(.*?)_/gm, '<em>$1</em>');

    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/gm, '<a href="$2" class="text-danger-red hover:underline">$1</a>');

    // Lists
    html = html.replace(/^\* (.*?)$/gm, '<li class="ml-6 mb-2">$1</li>');
    html = html.replace(/^\- (.*?)$/gm, '<li class="ml-6 mb-2">$1</li>');
    html = html.replace(/(<li.*?<\/li>)/s, '<ul class="mb-4">$1</ul>');

    // Blockquotes
    html = html.replace(/^> (.*?)$/gm, '<blockquote class="border-l-4 border-danger-red pl-4 italic text-gray-400 my-4">$1</blockquote>');

    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p class="mb-4">');
    html = '<p class="mb-4">' + html + '</p>';

    // Line breaks
    html = html.replace(/\n/g, '<br>');

    return html;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MarkdownParser;
}
