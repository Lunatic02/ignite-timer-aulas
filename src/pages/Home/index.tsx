import { HandPalm, Play } from "phosphor-react";
import * as zod from 'zod'
import { HomeContainer, StartCountdownButton, StopCountdownButton} from "./styles";
import { createContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

 
  


 const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a Tarefa'),
  minutesAmount: zod.number().min(5).max(60)
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch, reset} = newCycleForm

  const task = watch('task')
  const isSubmitDisabled = !task
  return(
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        {activeCycle ?
        (<StopCountdownButton onClick={handleInterruptNewCycle} type="button">
        <HandPalm size={24}/>
        Interromper
         </StopCountdownButton>)
        :
        (<StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24}/>
            Começar
          </StartCountdownButton>)
      }
      </form>
    </HomeContainer>
  ) 
  
}