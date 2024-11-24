import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import { Header } from '@/app-example/components/header'
import { colors } from '@/app-example/constants/colors'
import Input from '@/app-example/components/input'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { router } from 'expo-router'
import { userDataStore } from '@/store/data'

const schema = z.object({
  name: z.string().min(1, { message: 'Nome é obrigatório' }),
  weight: z.string().min(1, { message: 'Peso é obrigatório' }),
  age: z.string().min(1, { message: 'Idade é obrigatório' }),
  height: z.string().min(1, { message: 'Altura é obrigatório' })
})

type formData = z.infer<typeof schema>

export default function Step() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<formData>({
    resolver: zodResolver(schema)
  })

  const setPageOne = userDataStore(state => state.setPageOne)

  function handleCreate(data: formData) {
    setPageOne({
      name: data.name,
      weight: data.height,
      age: data.age,
      height: data.height
    })
    router.push('/create')
  }
  return (
    <View style={styles.container}>
      <Header step="Passo 1" title="Vamos começar" />

      <ScrollView style={styles.content}>
        <Text style={styles.label}>Nome:</Text>
        <Input
          name="name"
          control={control}
          placeholder="Digite seu nome"
          error={errors.name?.message}
          keyboardType="default"
        />

        <Text style={styles.label}>Peso:</Text>
        <Input
          name="weight"
          control={control}
          placeholder="Ex: 75"
          error={errors.weight?.message}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Altura:</Text>
        <Input
          name="height"
          control={control}
          placeholder="Ex: 1,80"
          error={errors.height?.message}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Idade:</Text>
        <Input
          name="age"
          control={control}
          placeholder="Digite sua idade"
          error={errors.age?.message}
          keyboardType="numeric"
        />

        <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16
  },
  label: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 8
  },
  button: {
    backgroundColor: colors.blue,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 20
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  }
})
