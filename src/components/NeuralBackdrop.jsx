import { useEffect, useRef } from 'react'
import './NeuralBackdrop.css'

export default function NeuralBackdrop() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return undefined

        const context = canvas.getContext('2d')
        if (!context) return undefined

        let animationFrameId = 0
        let width = 0
        let height = 0

        const nodes = []
        const nodeCountX = 8
        const nodeCountY = 7

        const resize = () => {
            const pixelRatio = window.devicePixelRatio || 1
            width = window.innerWidth
            height = window.innerHeight
            canvas.width = width * pixelRatio
            canvas.height = height * pixelRatio
            canvas.style.width = `${width}px`
            canvas.style.height = `${height}px`
            context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
        }

        const buildNodes = () => {
            nodes.length = 0
            for (let row = 0; row < nodeCountY; row += 1) {
                for (let col = 0; col < nodeCountX; col += 1) {
                    nodes.push({
                        x: (col / (nodeCountX - 1)) * 2 - 1,
                        y: (row / (nodeCountY - 1)) * 2 - 1,
                        zSeed: Math.random() * Math.PI * 2,
                        weight: Math.random(),
                    })
                }
            }
        }

        const project = (x, y, z, cameraDistance) => {
            const perspective = cameraDistance / (cameraDistance - z)
            return {
                x: width / 2 + x * perspective,
                y: height / 2 + y * perspective,
                scale: perspective,
            }
        }

        const draw = () => {
            context.clearRect(0, 0, width, height)

            const scrollFactor = window.scrollY * 0.00045
            const pageDepth = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
            const time = performance.now() * 0.00015
            const cameraDistance = 3.2
            const points = []

            context.save()
            context.translate(width / 2, height / 2)
            context.rotate(Math.sin(scrollFactor * 0.8) * 0.16 + pageDepth * 0.35)
            context.translate(-width / 2, -height / 2)

            for (const node of nodes) {
                const x = node.x * width * 0.42
                const y = node.y * height * 0.34
                const zWave = Math.sin(time + node.zSeed + scrollFactor * 3.4) * 0.9
                const depth = zWave + Math.cos(scrollFactor * 1.2 + node.y * 1.8) * 0.45 + pageDepth * 0.5
                const projected = project(x, y + depth * 40, depth, cameraDistance)
                points.push({ ...projected, depth, node })
            }

            for (let i = 0; i < points.length; i += 1) {
                for (let j = i + 1; j < points.length; j += 1) {
                    const a = points[i]
                    const b = points[j]
                    const distanceX = a.x - b.x
                    const distanceY = a.y - b.y
                    const distance = Math.hypot(distanceX, distanceY)
                    if (distance > 180) continue

                    const alpha = Math.max(0, 0.24 - distance / 900)
                    context.beginPath()
                    context.moveTo(a.x, a.y)
                    context.lineTo(b.x, b.y)
                    context.strokeStyle = a.depth + b.depth > 0 ? `rgba(0, 229, 255, ${alpha})` : `rgba(168, 85, 247, ${alpha * 0.8})`
                    context.lineWidth = 1.2
                    context.stroke()
                }
            }

            for (const point of points) {
                const radius = 1.8 + point.node.weight * 2.1
                context.beginPath()
                context.arc(point.x, point.y, radius * point.scale, 0, Math.PI * 2)
                context.fillStyle = point.depth > 0 ? 'rgba(0, 229, 255, 0.95)' : 'rgba(168, 85, 247, 0.88)'
                context.fill()

                context.beginPath()
                context.arc(point.x, point.y, radius * point.scale * 2.2, 0, Math.PI * 2)
                context.fillStyle = point.depth > 0 ? 'rgba(0, 229, 255, 0.05)' : 'rgba(168, 85, 247, 0.04)'
                context.fill()
            }

            context.restore()
            animationFrameId = window.requestAnimationFrame(draw)
        }

        resize()
        buildNodes()
        window.addEventListener('resize', resize)
        animationFrameId = window.requestAnimationFrame(draw)

        return () => {
            window.removeEventListener('resize', resize)
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <div className="neural-backdrop" aria-hidden="true">
            <div className="neural-backdrop__grid" />
            <canvas ref={canvasRef} className="neural-backdrop__canvas" />
            <div className="neural-backdrop__glow neural-backdrop__glow--cyan" />
            <div className="neural-backdrop__glow neural-backdrop__glow--purple" />
        </div>
    )
}