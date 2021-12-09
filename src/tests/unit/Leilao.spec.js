
import Leilao from '@/components/Leilao'
import { mount } from '@vue/test-utils'

const leilao = {
  produto: 'Casa Amarela',
  lanceInicial: 40000,
  descricao: 'Uma casa muito linda'
}

describe('Um leilão exibe os dados do produto', () => {
  test('exibe os dados do leilão no card', async () => {
    const wrapper = mount(Leilao, {
      propsData: {
        leilao
      }
    })

    await wrapper.vm.$nextTick()

    const header = wrapper.find('.card-header').element
    const title = wrapper.find('.card-title').element
    const text = wrapper.find('.card-text').element

    expect(header.textContent).toContain(`Estamos leiloando um(a): ${leilao.produto}`)
    expect(title.textContent).toContain(`Lance inicial: R$ ${leilao.lanceInicial}`)
    expect(text.textContent).toContain(leilao.descricao)
  })
})
