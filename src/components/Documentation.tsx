import { FileText } from 'lucide-react';

export const Documentation = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white/10 rounded-lg shadow-lg mt-8">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-6 h-6" />
        <h2 className="text-xl font-semibold">使用说明</h2>
      </div>
      
      <div className="space-y-4">
        <section>
          <h3 className="font-medium mb-2">URL 参数配置</h3>
          <ul className="list-disc list-inside space-y-2">
            <li><code>data</code>: JSON格式的图表数据，包含 labels 和 values 数组</li>
            <li><code>theme</code>: 配色方案选择 (theme1/theme2)</li>
            <li><code>hideDocs</code>: 是否隐藏文档 (true/false)</li>
          </ul>
        </section>

        <section>
          <h3 className="font-medium mb-2">示例 URL</h3>
          <code className="block p-3 bg-black/20 rounded">
            ?data={'{\"labels\":[\"A\",\"B\",\"C\",\"D\",\"E\"],\"values\":[80,65,90,45,70]}'}&theme=theme1
          </code>
        </section>

        <section>
          <h3 className="font-medium mb-2">主题说明</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>theme1: 浅色主题，适合日间使用</li>
            <li>theme2: 深色主题，适合夜间使用</li>
          </ul>
        </section>
      </div>
    </div>
  );
};