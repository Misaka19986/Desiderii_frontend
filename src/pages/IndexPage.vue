<script setup>
import { onMounted, ref } from 'vue';
const friends = ref([]);
onMounted(async () => {
  friends.value = [
    {
      avatar: 'https://avatars.githubusercontent.com/u/32397288?v=4',
      nickname: 'Desiderii',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32397288?v=4',
      nickname: 'Desiderii',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32397288?v=4',
      nickname: 'Desiderii',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32397288?v=4',
      nickname: 'Desiderii',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32397288?v=4',
      nickname: 'Desiderii',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32397288?v=4',
      nickname: 'Desiderii',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32397288?v=4',
      nickname: 'Desiderii',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32397288?v=4',
      nickname: 'Desiderii',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32397288?v=4',
      nickname: 'Desiderii',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32397288?v=4',
      nickname: 'Desiderii',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32397288?v=4',
      nickname: 'Desiderii',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32397288?v=4',
      nickname: 'Desiderii',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32397288?v=4',
      nickname: 'Desiderii',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/32397288?v=4',
      nickname: 'Desiderii',
    }
  ];
});

</script>

<template>
  <q-page>
    <div class="flex flex-col items-center q-mx-xl">
      <div class="flex flex-center q-mt-lg">
        <q-icon name="link" size="2rem" class="text-primary" />
        <div class="text-h3 text-weight-bolder text-center q-ma-md">友情链接</div>
      </div>
      <div class="fit row wrap justify-start items-start content-start">
        <div v-for="index in friends.length" :key="index" class="col-12 col-sm-12 col-md-4">
          <q-card class="q-ma-md card_friend rounded-xl cursor-pointer" :class="`bg-friend-${index % 7}`"
            @click="toFriendDetail(index - 1)">
            <q-avatar class="q-ma-md Imground absolute-right" size="100px">
              <img :src="friends[index - 1].avatar" />
            </q-avatar>
            <div class="q-ma-md bg-friend-text-1 absolute-top-left text-h6 typewriter text-caption">
              {{ friends[index - 1].url }}
            </div>
            <div class="q-ma-md bg-friend-text-0 text-white absolute-bottom-left text-weight-bolder text-h5">
              {{ friends[index - 1].nickname }}
            </div>

          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style scoped>
.typewriter {
  overflow: hidden;
  white-space: nowrap;
  animation: typing 2s steps(40);
}

@keyframes typing {
  from {
    width: 0;
  }

  to {
    width: 100%;
  }
}

.Imground {
  border-radius: 50% !important;
}

.card_friend {
  height: 150px;
}

.card_friend:hover {
  transform: scale(1.05);
  transition: all 0.3s ease-in-out;
}

.bg-friend-0 {
  background-image: linear-gradient(to bottom right, #a7d4f7, #d8a7f7);
}

.bg-friend-1 {
  background-image: linear-gradient(to bottom right, #d834c2, #f7a8b8);
}

.bg-friend-2 {
  background-image: linear-gradient(to bottom right, #f7a8b8, #fbc2a7);
}

.bg-friend-3 {
  background-image: linear-gradient(to bottom right, #fbc2a7, #f7e3a7);
}

.bg-friend-4 {
  background-image: linear-gradient(to bottom right, #f7e3a7, #a7f7c4);
}

.bg-friend-5 {
  background-image: linear-gradient(to bottom right, #a7f7c4, #a7f7f2);
}

.bg-friend-6 {
  background-image: linear-gradient(to bottom right, #a7f7f2, #a7d4f7);
}

.bg-friend-text-0 {
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(to bottom right, #444444, #666666);
}

.bg-friend-text-1 {
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(to bottom right, #333333, #555555);
}
</style>
