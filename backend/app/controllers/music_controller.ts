import { HttpContext } from '@adonisjs/core/http'
import Music from '#models/music'

export default class MusicController {
  public async index({ response }: HttpContext) {
    try {
      const music = await Music.all()
      response.status(200).json(music)
    } catch (error) {
      response.status(500).json({ message: 'Error fetching music records', error })
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['musicUrl', 'imageUrl', 'title', 'paragraph'])
      const music = await Music.create(data)
      response.status(201).json(music)
    } catch (error) {
      response.status(500).json({ message: 'Error creating music record', error })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const music = await Music.findOrFail(params.id)
      response.status(200).json(music)
    } catch (error) {
      response.status(404).json({ message: 'Music record not found', error })
    }
  }

  public async update({ params, request, response }: HttpContext) {
    try {
      const music = await Music.findOrFail(params.id)
      const data = request.only(['musicUrl', 'imageUrl', 'title', 'paragraph'])
      music.merge(data)
      await music.save()
      response.status(200).json(music)
    } catch (error) {
      response.status(500).json({ message: 'Error updating music record', error })
    }
  }

  public async destroy({ params, response }: HttpContext) {
    try {
      const music = await Music.findOrFail(params.id)
      await music.delete()
      response.status(200).json({ message: 'Music record deleted successfully' })
    } catch (error) {
      response.status(500).json({ message: 'Error deleting music record', error })
    }
  }
}
