import { HandPalm, Play } from "phosphor-react";
import * as zod from 'zod'
import { HomeContainer, StartCountdownButton, StopCountdownButton} from "./styles";
import { createContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

  interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
  }

  interface CyclesContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null
    amountSecondsPassed: number
    markCurrentCycleAsFinished: ()=> void
    setSecondsPassed: (seconds: number) => void
  }

 export const CyclesContext = createContext({} as CyclesContextType)

 const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a Tarefa'),
  minutesAmount: zod.number().min(5).max(60)
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){

  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)


  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    }
  })

  const { handleSubmit, watch, reset} = newCycleForm

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number){
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished(){
    setCycles(state=> state.map(cycle => {
        if(cycle.id === activeCycleId){
          return {...cycle, finishedDate: new Date() } 
        } else{
          return cycle
        }
      }))

  }

  function handleCreateNewCycle(data: NewCycleFormData){
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }
    setCycles(state => [...cycles, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)

    reset()
  }
  function handleInterruptNewCycle(){
    setCycles(
      state =>( state.map(cycle => {
        if(cycle.id === activeCycleId){
          return {...cycle, interruptedDate: new Date() } 
        } else{
          return cycle
        }
      }))
     )
    setActiveCycleId(null)
  }
  const task = watch('task')
  const isSubmitDisabled = !task
  return(
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed,setSecondsPassed }}>
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
        </CyclesContext.Provider>
      </form>
    </HomeContainer>
  ) 
  
}