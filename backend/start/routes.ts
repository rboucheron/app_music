import router from '@adonisjs/core/services/router'
import MusicController from '#controllers/music_controller'

router
  .group(() => {
    router.get('/music', [MusicController, 'index'])

    router.post('/music', [MusicController, 'store'])

    router.get('/music/:id', [MusicController, 'show'])

    router.put('/music/:id', [MusicController, 'update'])

    router.delete('/music/:id', [MusicController, 'destroy'])
  })
  .prefix('/api')
