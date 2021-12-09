
import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leiloes = [
  [
    {
      id: 1,
      produto: 'Video Game',
      descricao: 'Um video game bem bacana, com vários jogos exclusivos.',
      lanceInicial: 1000
    },
    {
      id: 2,
      produto: 'Notebook',
      descricao: 'Completinho, quase novo. A diversão é garantida!',
      lanceInicial: 500
    }
  ]
]

describe('Um avaliador que se conectar com a API', () => {
  test('Garantir que ele mostre todos os leilões retornados pela api', async () => {
    getLeiloes.mockResolvedValueOnce(leiloes)

    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    await flushPromises()

    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(leiloes.length)
  })

  test('Não há leilões retornados pela api', async () => {
    getLeiloes.mockResolvedValueOnce([])

    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    await flushPromises()

    const totalLeiloesExibidos = wrapper.findAll('.leilao').length
    expect(totalLeiloesExibidos).toBe(0)
  })
})
