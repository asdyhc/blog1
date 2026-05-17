import { Github, Twitter, Mail, Globe, Shield, Binary, Code2, Terminal, Cpu, MessageCircle } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import GlowButton from '@/components/GlowButton'
import ViewCounter from '@/components/ViewCounter'

const skills = [
  { name: 'React / Vue', category: 'web' as const },
  { name: 'TypeScript', category: 'web' as const },
  { name: 'Node.js', category: 'web' as const },
  { name: 'Next.js', category: 'web' as const },
  { name: 'Tailwind CSS', category: 'web' as const },
  { name: 'SQL 注入', category: 'pentest' as const },
  { name: 'XSS / CSRF', category: 'pentest' as const },
  { name: 'Burp Suite', category: 'pentest' as const },
  { name: 'Wireshark', category: 'pentest' as const },
  { name: 'Nmap', category: 'pentest' as const },
  { name: '动态规划', category: 'algorithm' as const },
  { name: '图论', category: 'algorithm' as const },
  { name: '双指针 / 滑动窗口', category: 'algorithm' as const },
  { name: 'LeetCode 500+', category: 'algorithm' as const },
  { name: '排序 & 搜索', category: 'algorithm' as const },
]

const skillColors = {
  web: 'border-neon-gold text-neon-gold bg-neon-gold/5',
  pentest: 'border-neon-magenta text-neon-magenta bg-neon-magenta/5',
  algorithm: 'border-neon-green text-neon-green bg-neon-green/5',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-neon-magenta/20 border border-neon-cyan/30 flex items-center justify-center">
              <Terminal className="w-10 h-10 text-neon-cyan" />
            </div>
            <h1 className="font-orbitron text-4xl md:text-5xl font-black text-white mb-4">
              <span className="text-neon-cyan">&gt;</span> ABOUT_ME
            </h1>
            <p className="text-gray-400 font-mono text-sm">~/whoami</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="bg-dark-card border border-dark-border/50 rounded-2xl p-8 md:p-10 mb-12">
            <div className="font-mono text-sm leading-relaxed text-gray-400 space-y-4">
              <p>
                <span className="text-neon-cyan">$</span> 一名热爱技术的全栈开发者，专注于 Web 开发、网络安全和算法研究。
              </p>
              <p>
                <span className="text-neon-magenta">$</span> 白天写代码构建 Web 应用，晚上在 CTF 中磨练渗透技巧，闲暇时在 LeetCode 上钻研算法。
              </p>
              <p>
                <span className="text-neon-green">$</span> 相信技术的力量，希望通过这个博客分享知识、记录成长，帮助更多技术爱好者少走弯路。
              </p>
              <p>
                <span className="text-neon-cyan">$</span> 始终保持好奇心和学习热情 ——<span className="animate-typewriter-cursor inline-block w-2 h-4 bg-neon-cyan ml-1 align-middle" />
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="mb-12">
            <h2 className="font-orbitron text-2xl font-bold text-white mb-8 text-center">
              <span className="text-neon-magenta">&lt;</span>
              技术栈
              <span className="text-neon-magenta"> /&gt;</span>
            </h2>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 rounded-xl bg-dark-card border border-neon-gold/20">
                <Globe className="w-8 h-8 text-neon-gold mx-auto mb-3" />
                <div className="font-mono text-xs text-neon-gold/70">Web 开发</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-dark-card border border-neon-magenta/20">
                <Shield className="w-8 h-8 text-neon-magenta mx-auto mb-3" />
                <div className="font-mono text-xs text-neon-magenta/70">渗透测试</div>
              </div>
              <div className="text-center p-4 rounded-xl bg-dark-card border border-neon-green/20">
                <Binary className="w-8 h-8 text-neon-green mx-auto mb-3" />
                <div className="font-mono text-xs text-neon-green/70">算法</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 justify-center">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className={`text-xs font-mono px-3 py-1.5 rounded-full border ${skillColors[skill.category]}`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={250}>
          <div className="mb-12">
            <h2 className="font-orbitron text-2xl font-bold text-white mb-8 text-center">
              <span className="text-neon-cyan">$</span> 访问统计 <span className="text-neon-cyan">_</span>
            </h2>
            <ViewCounter />
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={300}>
          <div className="text-center">
            <h2 className="font-orbitron text-2xl font-bold text-white mb-8">
              <span className="text-neon-green">$</span> 联系我 <span className="text-neon-green">_</span>
            </h2>

            <div className="flex justify-center gap-4 mb-8">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-dark-card border border-dark-border/50 flex items-center justify-center text-gray-500 hover:text-white hover:border-dark-border hover:shadow-lg hover:shadow-neon-cyan/10 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-dark-card border border-dark-border/50 flex items-center justify-center text-gray-500 hover:text-white hover:border-dark-border hover:shadow-lg hover:shadow-neon-cyan/10 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:jasperworkzh@163.com"
                className="w-12 h-12 rounded-xl bg-dark-card border border-dark-border/50 flex items-center justify-center text-gray-500 hover:text-white hover:border-dark-border hover:shadow-lg hover:shadow-neon-cyan/10 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://qm.qq.com/cgi-bin/qm/qr?k=2900248264"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-dark-card border border-dark-border/50 flex items-center justify-center text-gray-500 hover:text-white hover:border-dark-border hover:shadow-lg hover:shadow-neon-cyan/10 transition-all"
                  title="QQ: 2900248264"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            <div className="flex justify-center gap-4">
              <a href="https://github.com">
                <GlowButton color="#00f0ff">
                  <span className="flex items-center gap-2">
                    <Code2 className="w-4 h-4" />
                    GitHub
                  </span>
                </GlowButton>
              </a>
              <a href="mailto:jasperworkzh@163.com">
                <GlowButton color="#ff00aa">
                  <span className="flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    邮件联系
                  </span>
                </GlowButton>
              </a>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-20 text-center">
          <p className="font-mono text-[10px] text-gray-700">
            &lt;end_of_file&gt; EOF reached. Session terminated.
          </p>
        </div>
      </div>
    </div>
  )
}
