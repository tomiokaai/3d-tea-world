import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { Color, Object3D, type InstancedMesh } from 'three'
import type { Vec3 } from '@/config/journey'

export interface InstanceItem {
  position: Vec3
  rotationY?: number
  scale?: number | Vec3
  color?: string
}

const dummy = new Object3D()
const tint = new Color()

interface InstancedItemsProps {
  items: InstanceItem[]
  children: ReactNode // geometry + material
}

// One draw call for any number of identical meshes (bushes, trees, hills).
export function InstancedItems({ items, children }: InstancedItemsProps) {
  const ref = useRef<InstancedMesh>(null)

  useLayoutEffect(() => {
    const mesh = ref.current
    if (!mesh) return

    items.forEach((item, i) => {
      dummy.position.set(...item.position)
      dummy.rotation.set(0, item.rotationY ?? 0, 0)
      const s = item.scale ?? 1
      if (typeof s === 'number') dummy.scale.setScalar(s)
      else dummy.scale.set(...s)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      if (item.color) mesh.setColorAt(i, tint.set(item.color))
    })

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  }, [items])

  return (
    <instancedMesh
      key={items.length}
      ref={ref}
      args={[undefined, undefined, items.length]}
      frustumCulled={false}
    >
      {children}
    </instancedMesh>
  )
}
