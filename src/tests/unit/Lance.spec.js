
import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

describe('Um lance sem valor minimo', () => {
  test('Não aceita lançe com valor menor que zero', () => {
    const wrapper = mount(Lance)

    const input = wrapper.find('input')
    input.setValue(-100)

    const lancesEmitidos = wrapper.emitted('novo-lance')
    wrapper.trigger('submit')
    expect(lancesEmitidos).toBeUndefined()
  })

  test('Emite um lance quando o valor é maior que zero', () => {
    const wrapper = mount(Lance)

    const input = wrapper.find('input')
    input.setValue(100)

    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    expect(lancesEmitidos).toHaveLength(1)
  })

  test('Emite o valor esperado de um lance válido', () => {
    const wrapper = mount(Lance)
    const input = wrapper.find('input')

    input.setValue(100)
    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')

    const lance = parseInt(lancesEmitidos[0][0])
    expect(lance).toBe(100)
  })
})

describe('Um lance com valor mínimo', () => {
  test('Todos os lances devem possuir o valor maior que o minimo informado', () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })

    const input = wrapper.find('input')
    input.setValue(400)

    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')

    expect(lancesEmitidos).toHaveLength(1)
  })

  test('Emite o valor esperado de um lance valido', () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })

    const input = wrapper.find('input')
    input.setValue(400)

    wrapper.trigger('submit')
    const lancesEmitidos = wrapper.emitted('novo-lance')
    const valorLance = parseInt(lancesEmitidos[0][0])

    expect(valorLance).toBe(400)
  })

  test('Não são aceitos lances com valores menor que do minimo informado', async () => {
    const wrapper = mount(Lance, {
      propsData: {
        lanceMinimo: 300
      }
    })

    const input = wrapper.find('input')
    input.setValue(100)

    wrapper.trigger('submit')
    await wrapper.vm.$nextTick()
    const msgErro = wrapper.find('p.alert').element.textContent

    const msgEsperada = 'O valor mínimo para o lance é de R$ 300'

    expect(msgErro).toContain(msgEsperada)
  })
})
