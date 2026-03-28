import { useEffect, useRef, useState } from "react"
import func2url from "@/func2url.json"

interface Reel {
  id: number
  title: string
  video_url: string
  cover_url: string | null
  sort_order: number
}

const UPLOAD_URL = (func2url as Record<string, string>)["reels-upload"]
const GET_URL = (func2url as Record<string, string>)["reels-get"]

export default function Admin() {
  const [reels, setReels] = useState<Reel[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [title, setTitle] = useState("")
  const [sortOrder, setSortOrder] = useState(0)
  const videoRef = useRef<HTMLInputElement>(null)
  const coverRef = useRef<HTMLInputElement>(null)
  const [videoName, setVideoName] = useState("")
  const [coverName, setCoverName] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const loadReels = () => {
    setLoading(true)
    fetch(GET_URL)
      .then(r => r.json())
      .then(d => { setReels(d.reels || []); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { loadReels() }, [])

  const toBase64 = (file: File): Promise<string> =>
    new Promise((res, rej) => {
      const reader = new FileReader()
      reader.onload = () => res((reader.result as string).split(",")[1])
      reader.onerror = rej
      reader.readAsDataURL(file)
    })

  const handleUpload = async () => {
    const videoFile = videoRef.current?.files?.[0]
    if (!videoFile) { setError("Выбери видео файл"); return }
    if (videoFile.size > 100 * 1024 * 1024) { setError("Файл слишком большой (макс. 100 МБ)"); return }

    setUploading(true)
    setError("")
    setSuccess("")

    try {
      const videoB64 = await toBase64(videoFile)
      const coverFile = coverRef.current?.files?.[0]
      const coverB64 = coverFile ? await toBase64(coverFile) : null

      const body: Record<string, unknown> = {
        title: title || videoFile.name.replace(/\.[^.]+$/, ""),
        video: videoB64,
        sort_order: sortOrder,
      }
      if (coverB64) body.cover = coverB64

      const res = await fetch(UPLOAD_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (data.ok) {
        setSuccess("Видео загружено!")
        setTitle("")
        setSortOrder(reels.length)
        setVideoName("")
        setCoverName("")
        if (videoRef.current) videoRef.current.value = ""
        if (coverRef.current) coverRef.current.value = ""
        loadReels()
      } else {
        setError("Ошибка загрузки")
      }
    } catch {
      setError("Ошибка сети")
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить это видео?")) return
    await fetch(UPLOAD_URL, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
    loadReels()
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm tracking-[0.3em] uppercase mb-2" style={{ color: "#FF4D00" }}>
          Управление
        </p>
        <h1 className="text-3xl font-bold mb-10">Reels — загрузка видео</h1>

        <div className="bg-neutral-900 rounded-2xl p-6 mb-10 border border-neutral-800">
          <h2 className="text-lg font-semibold mb-4">Загрузить новое видео</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-neutral-400 block mb-1">Название (необязательно)</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Название ролика"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white placeholder-neutral-500 focus:outline-none focus:border-[#FF4D00]"
              />
            </div>

            <div>
              <label className="text-sm text-neutral-400 block mb-1">Видео (MP4, макс. 100 МБ) *</label>
              <label className="flex items-center gap-3 w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 cursor-pointer hover:border-[#FF4D00] transition-colors">
                <span className="text-[#FF4D00] text-sm font-medium">Выбрать файл</span>
                <span className="text-neutral-400 text-sm truncate">{videoName || "Файл не выбран"}</span>
                <input
                  ref={videoRef}
                  type="file"
                  accept="video/mp4,video/*"
                  className="hidden"
                  onChange={e => setVideoName(e.target.files?.[0]?.name || "")}
                />
              </label>
            </div>

            <div>
              <label className="text-sm text-neutral-400 block mb-1">Обложка (JPG/PNG, необязательно)</label>
              <label className="flex items-center gap-3 w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-3 cursor-pointer hover:border-[#FF4D00] transition-colors">
                <span className="text-[#FF4D00] text-sm font-medium">Выбрать файл</span>
                <span className="text-neutral-400 text-sm truncate">{coverName || "Файл не выбран"}</span>
                <input
                  ref={coverRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => setCoverName(e.target.files?.[0]?.name || "")}
                />
              </label>
            </div>

            <div>
              <label className="text-sm text-neutral-400 block mb-1">Порядок (0 = первый)</label>
              <input
                type="number"
                value={sortOrder}
                onChange={e => setSortOrder(Number(e.target.value))}
                className="w-24 bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#FF4D00]"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className="text-green-400 text-sm">{success}</p>}

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full py-3 rounded-xl font-bold text-white transition-opacity disabled:opacity-50"
              style={{ background: "#FF4D00" }}
            >
              {uploading ? "Загружаю..." : "Загрузить"}
            </button>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-4">Загруженные видео ({reels.length})</h2>

        {loading && <p className="text-neutral-500">Загрузка...</p>}

        {!loading && reels.length === 0 && (
          <p className="text-neutral-600">Видео ещё нет. Загрузи первое!</p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {reels.map(r => (
            <div key={r.id} className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 group" style={{ aspectRatio: '9/16' }}>
              <video
                src={r.video_url}
                poster={r.cover_url || undefined}
                className="absolute inset-0 w-full h-full object-cover"
                preload="metadata"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                <p className="text-white text-xs text-center font-medium">{r.title}</p>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 rounded-lg text-xs font-medium transition-colors"
                >
                  Удалить
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
