import { ClipboardCheck, AlertTriangle, Tag, XCircle } from 'lucide-vue-next'

export const analyticsStatsConfig = [
  {
    key: 'baik',
    label: 'Barang Baik',
    icon: ClipboardCheck,
    iconBgClass: 'bg-[#DAF3F7]',
    iconColorClass: 'text-[#427E81]',
  },
  {
    key: 'rusak',
    label: 'Barang Rusak',
    icon: AlertTriangle,
    iconBgClass: 'bg-[#F7E6E9]',
    iconColorClass: 'text-[#A18181]',
  },
  {
    key: 'dilelang',
    label: 'Dilelang',
    icon: Tag,
    iconBgClass: 'bg-[#F3ECDF]',
    iconColorClass: 'text-[#414C1C]',
  },
  {
    key: 'tidak_dipakai',
    label: 'Tidak Dipakai',
    icon: XCircle,
    iconBgClass: 'bg-[#DBE6F7]',
    iconColorClass: 'text-[#7A8088]',
  },
]

export const chartLabels = ['Barang Baik', 'Barang Rusak', 'Dilelang', 'Tidak Dipakai']

export const chartConfig = {
  backgroundColor: '#8b5cf6',
  borderRadius: 8,
  barThickness: 80,
}
